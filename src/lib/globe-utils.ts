import * as THREE from "three";
import type { FeatureCollection } from "geojson";

export function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lng + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

type Ring = [number, number][];

function pointInRing(lng: number, lat: number, ring: Ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    const intersect =
      yi > lat !== yj > lat &&
      lng < ((xj - xi) * (lat - yi)) / (yj - yi + Number.EPSILON) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function pointInPolygon(lng: number, lat: number, polygon: Ring[]) {
  if (!pointInRing(lng, lat, polygon[0])) return false;
  for (let h = 1; h < polygon.length; h += 1) {
    if (pointInRing(lng, lat, polygon[h])) return false;
  }
  return true;
}

function collectPolygons(collection: FeatureCollection) {
  const polygons: Ring[][] = [];

  for (const feature of collection.features) {
    const geometry = feature.geometry;
    if (!geometry) continue;

    if (geometry.type === "Polygon") {
      polygons.push(geometry.coordinates as Ring[]);
    } else if (geometry.type === "MultiPolygon") {
      for (const polygon of geometry.coordinates as Ring[][]) {
        polygons.push(polygon);
      }
    }
  }

  return polygons;
}

function isOnLand(lng: number, lat: number, polygons: Ring[][]) {
  for (const polygon of polygons) {
    if (pointInPolygon(lng, lat, polygon)) return true;
  }
  return false;
}

/** Uniform lat/lng grid of dots clipped to land — matches stippled reference style. */
export function buildLandDotGrid(
  collection: FeatureCollection,
  radius: number,
  gridStep: number,
  bounds: { latMin?: number; latMax?: number } = {},
) {
  const polygons = collectPolygons(collection);
  const dotPositions: number[] = [];
  const latMin = bounds.latMin ?? -58;
  const latMax = bounds.latMax ?? 84;

  for (let lat = latMin; lat <= latMax; lat += gridStep) {
    for (let lng = -180; lng < 180; lng += gridStep) {
      if (isOnLand(lng, lat, polygons)) {
        const p = latLngToVector3(lat, lng, radius);
        dotPositions.push(p.x, p.y, p.z);
      }
    }
  }

  const dots = new THREE.BufferGeometry();
  dots.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(dotPositions, 3),
  );

  return dots;
}

export function buildCountryGeometries(
  collection: FeatureCollection,
  radius: number,
  options: {
    borderStep?: number;
    fillGridStep?: number;
    includeOutlines?: boolean;
  } = {},
) {
  const {
    borderStep = 3,
    fillGridStep,
    includeOutlines = true,
  } = options;

  const polygons = collectPolygons(collection);
  const linePositions: number[] = [];
  const dotPositions: number[] = [];

  for (const polygon of polygons) {
    for (const ring of polygon) {
      if (includeOutlines) {
        for (let i = 0; i < ring.length - 1; i += 1) {
          const [lng1, lat1] = ring[i];
          const [lng2, lat2] = ring[i + 1];
          const a = latLngToVector3(lat1, lng1, radius);
          const b = latLngToVector3(lat2, lng2, radius);
          linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
        }
      }

      for (let i = 0; i < ring.length; i += borderStep) {
        const [lng, lat] = ring[i];
        const p = latLngToVector3(lat, lng, radius * 0.998);
        dotPositions.push(p.x, p.y, p.z);
      }
    }

    if (fillGridStep) {
      const ring = polygon[0];
      let minLat = 90;
      let maxLat = -90;
      let minLng = 180;
      let maxLng = -180;
      for (const [lng, lat] of ring) {
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
        minLng = Math.min(minLng, lng);
        maxLng = Math.max(maxLng, lng);
      }
      for (let lat = minLat; lat <= maxLat; lat += fillGridStep) {
        for (let lng = minLng; lng <= maxLng; lng += fillGridStep) {
          if (pointInPolygon(lng, lat, polygon)) {
            const p = latLngToVector3(lat, lng, radius * 0.996);
            dotPositions.push(p.x, p.y, p.z);
          }
        }
      }
    }
  }

  const lines = new THREE.BufferGeometry();
  if (linePositions.length) {
    lines.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3),
    );
  }

  const dots = new THREE.BufferGeometry();
  dots.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(dotPositions, 3),
  );

  return { lines: linePositions.length ? lines : null, dots };
}

export function buildGraticuleGeometry(radius: number, step = 30) {
  const positions: number[] = [];

  for (let lat = -60; lat <= 60; lat += step) {
    for (let lng = -180; lng < 180; lng += 3) {
      const a = latLngToVector3(lat, lng, radius);
      const b = latLngToVector3(lat, lng + 3, radius);
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }

  for (let lng = -180; lng < 180; lng += step) {
    for (let lat = -80; lat < 80; lat += 3) {
      const a = latLngToVector3(lat, lng, radius);
      const b = latLngToVector3(lat + 3, lng, radius);
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  return geometry;
}

export function buildArcGeometry(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  radius: number,
  segments = 48,
) {
  const start = latLngToVector3(lat1, lng1, radius);
  const end = latLngToVector3(lat2, lng2, radius);
  const positions: number[] = [];

  for (let i = 0; i < segments; i += 1) {
    const t1 = i / segments;
    const t2 = (i + 1) / segments;
    const a = start.clone().lerp(end, t1).normalize().multiplyScalar(radius);
    const b = start.clone().lerp(end, t2).normalize().multiplyScalar(radius);
    a.multiplyScalar(1 + Math.sin(Math.PI * t1) * 0.06);
    b.multiplyScalar(1 + Math.sin(Math.PI * t2) * 0.06);
    positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  return geometry;
}
