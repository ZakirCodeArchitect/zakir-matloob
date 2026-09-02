"use client";

import { Html, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { feature } from "topojson-client";
import type { FeatureCollection } from "geojson";
import type { Topology } from "topojson-specification";
import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";
import { productLocations } from "@/lib/data";
import {
  buildArcGeometry,
  buildCountryGeometries,
  buildGraticuleGeometry,
  latLngToVector3,
} from "@/lib/globe-utils";

export type GlobeVariant = "light" | "dark";

const themes = {
  light: {
    sphere: "#f5f2ee",
    dots: "#5c5650",
    dotSize: 0.014,
    dotOpacity: 0.95,
    graticule: "#c5c0b8",
    graticuleOpacity: 0.18,
    outline: "#6f6a64",
    outlineOpacity: 0.55,
    pin: "#ff4d1c",
    arc: "#b8b3ac",
    arcOpacity: 0.5,
    tooltipBg: "bg-white/95 border-black/8 text-ink",
    tooltipMuted: "text-ink/45",
    autoRotateSpeed: 0.08,
    fillGridStep: 1.4,
    borderStep: 1,
  },
  dark: {
    sphere: "#030508",
    dots: "#7affb8",
    dotSize: 0.009,
    dotOpacity: 0.55,
    graticule: "#63ff9c",
    graticuleOpacity: 0,
    outline: "#63ff9c",
    outlineOpacity: 0.92,
    pin: "#ff4d1c",
    arc: "#63ff9c",
    arcOpacity: 0.25,
    tooltipBg: "bg-black/90 border-white/10 text-white",
    tooltipMuted: "text-[#7affb8]",
    autoRotateSpeed: 0.12,
    fillGridStep: undefined as number | undefined,
    borderStep: 4,
  },
} as const;

function Earth({
  variant,
  onReady,
}: {
  variant: GlobeVariant;
  onReady?: () => void;
}) {
  const theme = themes[variant];
  const groupRef = useRef<THREE.Group>(null);
  const dragging = useRef(false);
  const reduceMotion = useReducedMotion();
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
    return buildCountryGeometries(collection, 1.002, {
      borderStep: theme.borderStep,
      fillGridStep: theme.fillGridStep,
      includeOutlines: theme.outlineOpacity > 0,
    });
  }, [
    collection,
    theme.borderStep,
    theme.fillGridStep,
    theme.outlineOpacity,
  ]);

  const graticule = useMemo(
    () => (variant === "light" ? buildGraticuleGeometry(1.004, 30) : null),
    [variant],
  );

  const arcs = useMemo(() => {
    if (productLocations.length < 2) return [];
    const pairs: [number, number][] = [
      [0, 1],
      [0, 2],
      [1, 3],
    ];
    return pairs.map(([a, b]) =>
      buildArcGeometry(
        productLocations[a].lat,
        productLocations[a].lng,
        productLocations[b].lat,
        productLocations[b].lng,
        1.018,
      ),
    );
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current || dragging.current || reduceMotion) return;
    groupRef.current.rotation.y += delta * theme.autoRotateSpeed;
  });

  return (
    <>
      <ambientLight intensity={variant === "light" ? 0.95 : 0.35} />
      {variant === "dark" ? (
        <>
          <pointLight position={[6, 4, 6]} intensity={1.4} color="#7dffb0" />
          <pointLight position={[-4, -2, -5]} intensity={0.35} color="#ff4d1c" />
        </>
      ) : (
        <directionalLight position={[4, 2, 6]} intensity={0.35} color="#ffffff" />
      )}

      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[0.992, 96, 96]} />
          <meshBasicMaterial color={theme.sphere} />
        </mesh>

        {graticule ? (
          <lineSegments geometry={graticule}>
            <lineBasicMaterial
              color={theme.graticule}
              transparent
              opacity={theme.graticuleOpacity}
            />
          </lineSegments>
        ) : null}

        {lines && theme.outlineOpacity > 0 ? (
          <lineSegments geometry={lines}>
            <lineBasicMaterial
              color={theme.outline}
              transparent
              opacity={theme.outlineOpacity}
            />
          </lineSegments>
        ) : null}

        {dots ? (
          <points geometry={dots}>
            <pointsMaterial
              color={theme.dots}
              size={theme.dotSize}
              transparent
              opacity={theme.dotOpacity}
              sizeAttenuation
              depthWrite={false}
            />
          </points>
        ) : null}

        {arcs.map((arc, i) => (
          <lineSegments key={i} geometry={arc}>
            <lineBasicMaterial
              color={theme.arc}
              transparent
              opacity={theme.arcOpacity}
            />
          </lineSegments>
        ))}

        {productLocations.map((loc) => {
          const pos = latLngToVector3(loc.lat, loc.lng, 1.015);
          const normal = pos.clone().normalize();
          const active = activePin === loc.id;
          return (
            <group key={loc.id} position={pos}>
              <mesh
                position={normal.clone().multiplyScalar(0.018)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePin(active ? null : loc.id);
                }}
                onPointerOver={() => setActivePin(loc.id)}
              >
                <sphereGeometry args={[0.016, 12, 12]} />
                <meshBasicMaterial color={theme.pin} />
              </mesh>
              {active ? (
                <Html
                  distanceFactor={6}
                  position={normal.clone().multiplyScalar(0.1)}
                  className="pointer-events-none"
                >
                  <div
                    className={`w-max max-w-[180px] rounded-xl border px-3 py-2 shadow-lg backdrop-blur-md ${theme.tooltipBg}`}
                  >
                    <p
                      className={`font-mono text-[9px] uppercase tracking-[0.14em] ${theme.tooltipMuted}`}
                    >
                      {loc.country}
                    </p>
                    <p className="mt-1 text-xs font-medium">{loc.label}</p>
                  </div>
                </Html>
              ) : null}
            </group>
          );
        })}
      </group>

      {variant === "dark" ? (
        <mesh scale={1.14}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial
            color="#52ff96"
            transparent
            opacity={0.045}
            side={THREE.BackSide}
          />
        </mesh>
      ) : null}

      <OrbitControls
        enablePan={false}
        minDistance={2.2}
        maxDistance={4.8}
        rotateSpeed={0.45}
        zoomSpeed={0.55}
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

export function GlobeSceneCanvas({ variant = "light" }: { variant?: GlobeVariant }) {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 3.1], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      {variant === "dark" ? (
        <Stars radius={80} depth={40} count={1200} factor={3} fade speed={0.4} />
      ) : null}
      <Earth variant={variant} />
    </Canvas>
  );
}
