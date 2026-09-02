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

export function buildCountryGeometries(
  collection: FeatureCollection,
  radius: number,
  dotStep = 3,
  includeOutlines = true,
) {
  const linePositions: number[] = [];
  const dotPositions: number[] = [];

  for (const feature of collection.features) {
    const geometry = feature.geometry;
    if (!geometry) continue;

    const polygons =
      geometry.type === "Polygon"
        ? [geometry.coordinates]
        : geometry.type === "MultiPolygon"
          ? geometry.coordinates
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

        for (let i = 0; i < ring.length; i += dotStep) {
          const [lng, lat] = ring[i];
          const p = latLngToVector3(lat, lng, radius * 0.998);
          dotPositions.push(p.x, p.y, p.z);
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

