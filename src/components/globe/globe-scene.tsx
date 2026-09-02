"use client";

import { Html, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { feature } from "topojson-client";
import type { FeatureCollection } from "geojson";
import type { Topology } from "topojson-specification";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { productLocations } from "@/lib/data";
import { buildCountryGeometries, latLngToVector3 } from "@/lib/globe-utils";

function Earth({
  onReady,
}: {
  onReady?: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const dragging = useRef(false);
  const [collection, setCollection] = useState<FeatureCollection | null>(null);
  const [activePin, setActivePin] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/geo/countries-110m.json")
      .then((res) => res.json())
      .then((topology: Topology) => {
        if (cancelled) return;
        const countries = feature(
          topology,
          topology.objects.countries,
        ) as FeatureCollection;
        setCollection(countries);
        onReady?.();
      })
      .catch(() => onReady?.());
    return () => {
      cancelled = true;
    };
  }, [onReady]);

  const { lines, dots } = useMemo(() => {
    if (!collection) return { lines: null, dots: null };
    return buildCountryGeometries(collection, 1.002, 4);
  }, [collection]);

  useFrame((_, delta) => {
    if (!groupRef.current || dragging.current) return;
    groupRef.current.rotation.y += delta * 0.12;
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[6, 4, 6]} intensity={1.4} color="#7dffb0" />
      <pointLight position={[-4, -2, -5]} intensity={0.35} color="#ff4d1c" />

      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[0.992, 96, 96]} />
          <meshBasicMaterial color="#030508" />
        </mesh>

        {lines ? (
          <lineSegments geometry={lines}>
            <lineBasicMaterial color="#63ff9c" transparent opacity={0.92} />
          </lineSegments>
        ) : null}

        {dots ? (
          <points geometry={dots}>
            <pointsMaterial
              color="#7affb8"
              size={0.009}
              transparent
              opacity={0.55}
              sizeAttenuation
              depthWrite={false}
            />
          </points>
        ) : null}

        {productLocations.map((loc) => {
          const pos = latLngToVector3(loc.lat, loc.lng, 1.028);
          const normal = pos.clone().normalize();
          const active = activePin === loc.id;
          return (
            <group key={loc.id} position={pos}>
              <mesh
                position={normal.clone().multiplyScalar(0.025)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePin(active ? null : loc.id);
                }}
                onPointerOver={() => setActivePin(loc.id)}
              >
                <sphereGeometry args={[0.022, 16, 16]} />
                <meshStandardMaterial
                  color="#ff4d1c"
                  emissive="#ff4d1c"
                  emissiveIntensity={active ? 1.4 : 0.85}
                />
              </mesh>
              <mesh position={normal.clone().multiplyScalar(0.012)}>
                <sphereGeometry args={[0.038, 16, 16]} />
                <meshBasicMaterial color="#ff4d1c" transparent opacity={0.18} />
              </mesh>
              {active ? (
                <Html
                  distanceFactor={6}
                  position={normal.clone().multiplyScalar(0.12)}
                  className="pointer-events-none"
                >
                  <div className="w-max max-w-[180px] rounded-xl border border-white/10 bg-black/90 px-3 py-2 shadow-xl backdrop-blur-md">
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#7affb8]">
                      {loc.country}
                    </p>
                    <p className="mt-1 text-xs font-medium text-white">{loc.label}</p>
                  </div>
                </Html>
              ) : null}
            </group>
          );
        })}
      </group>

      <mesh scale={1.14}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#52ff96"
          transparent
          opacity={0.045}
          side={THREE.BackSide}
        />
      </mesh>

      <OrbitControls
        enablePan={false}
        minDistance={2.4}
        maxDistance={5}
        rotateSpeed={0.45}
        zoomSpeed={0.6}
        onStart={() => {
          dragging.current = true;
        }}
        onEnd={() => {
          dragging.current = false;
        }}
      />
    </>
  );
}

export function GlobeSceneCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.2], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Stars radius={80} depth={40} count={1200} factor={3} fade speed={0.4} />
      <Earth />
    </Canvas>
  );
}
