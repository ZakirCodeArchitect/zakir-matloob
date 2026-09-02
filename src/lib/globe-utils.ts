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
        for (let i = 0; i < ring.length - 1; i += 1) {
          const [lng1, lat1] = ring[i];
          const [lng2, lat2] = ring[i + 1];
          const a = latLngToVector3(lat1, lng1, radius);
          const b = latLngToVector3(lat2, lng2, radius);
          linePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
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
  lines.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(linePositions, 3),
  );

  const dots = new THREE.BufferGeometry();
  dots.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(dotPositions, 3),
  );

  return { lines, dots };
}
