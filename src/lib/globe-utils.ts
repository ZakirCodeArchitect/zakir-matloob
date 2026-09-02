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

function ringBounds(ring: Ring) {
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
  return { minLat, maxLat, minLng, maxLng };
}

function addDot(
  dotPositions: number[],
  lat: number,
  lng: number,
  radius: number,
) {
  const p = latLngToVector3(lat, lng, radius);
  dotPositions.push(p.x, p.y, p.z);
}

function fillPolygonDots(
  dotPositions: number[],
  polygon: Ring[],
  radius: number,
  gridStep: number,
) {
  const { minLat, maxLat, minLng, maxLng } = ringBounds(polygon[0]);
  for (let lat = minLat; lat <= maxLat; lat += gridStep) {
    for (let lng = minLng; lng <= maxLng; lng += gridStep) {
      if (pointInPolygon(lng, lat, polygon)) {
        addDot(dotPositions, lat, lng, radius);
      }
    }
  }
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

  const linePositions: number[] = [];
  const dotPositions: number[] = [];

  for (const feature of collection.features) {
    const geometry = feature.geometry;
    if (!geometry) continue;

    const polygons: Ring[][] =
      geometry.type === "Polygon"
        ? [geometry.coordinates as Ring[]]
        : geometry.type === "MultiPolygon"
          ? (geometry.coordinates as Ring[][])
          : [];

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
          addDot(dotPositions, lat, lng, radius * 0.998);
        }
      }

      if (fillGridStep) {
        fillPolygonDots(dotPositions, polygon, radius * 0.996, fillGridStep);
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
