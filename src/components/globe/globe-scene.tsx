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
  buildCountryDotGrids,
  latLngToVector3,
} from "@/lib/globe-utils";

export type GlobeVariant = "light" | "dark";

const themes = {
  light: {
    sphere: "transparent",
    hideSphere: true,
    dots: "#1a1a1a",
    dotSize: 0.014,
    dotOpacity: 1,
    graticuleOpacity: 0,
    outline: "#4f4944",
    outlineOpacity: 0.42,
    pin: "#ff4d1c",
    arcOpacity: 0,
    tooltipBg: "bg-white/95 border-black/8 text-ink",
    tooltipMuted: "text-ink/45",
    autoRotateSpeed: 0.08,
    gridStep: 1.2,
    showArcs: false,
  },
  dark: {
    sphere: "#030508",
    hideSphere: false,
    dots: "#7affb8",
    dotSize: 0.009,
    dotOpacity: 0.55,
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
    showArcs: true,
  },
} as const;

function Earth({
  variant,
  onReady,
  onDragStart,
  onDragEnd,
}: {
  variant: GlobeVariant;
  onReady?: () => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}) {
  const theme = themes[variant];
  const groupRef = useRef<THREE.Group>(null);
  const dragging = useRef(false);
  const reduceMotion = useReducedMotion();
  const [collection, setCollection] = useState<FeatureCollection | null>(null);
  const [activePin, setActivePin] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const dotTexture = useMemo(() => {
    if (variant !== "light" || typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [variant]);

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

  const landDotGroups = useMemo(() => {
    if (!collection) return [];
    if (variant === "light") {
      return buildCountryDotGrids(
        collection,
        1.003,
        themes.light.gridStep,
      );
    }
    return [
      {
        id: "dark",
        geometry: buildCountryGeometries(collection, 1.002, {
          borderStep: themes.dark.borderStep,
          fillGridStep: themes.dark.fillGridStep,
          includeOutlines: themes.dark.outlineOpacity > 0,
        }).dots,
      },
    ];
  }, [collection, variant]);

  const outlineLines = useMemo(() => {
    if (!collection) return null;
    return buildCountryGeometries(collection, 1.002, {
      borderStep: themes.dark.borderStep,
      includeOutlines: true,
    }).lines;
  }, [collection, variant]);

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
      <ambientLight intensity={variant === "dark" ? 0.35 : 0} />
      {variant === "dark" ? (
        <>
          <pointLight position={[6, 4, 6]} intensity={1.4} color="#7dffb0" />
          <pointLight position={[-4, -2, -5]} intensity={0.35} color="#ff4d1c" />
        </>
      ) : null}

      <group ref={groupRef}>
        {theme.hideSphere ? (
          <mesh>
            <sphereGeometry args={[0.992, 96, 96]} />
            <meshBasicMaterial colorWrite={false} depthWrite />
          </mesh>
        ) : (
          <mesh>
            <sphereGeometry args={[0.992, 96, 96]} />
            <meshBasicMaterial color={theme.sphere} />
          </mesh>
        )}

        {outlineLines ? (
          <lineSegments geometry={outlineLines}>
            <lineBasicMaterial
              color={theme.outline}
              transparent
              opacity={theme.outlineOpacity}
            />
          </lineSegments>
        ) : null}

        {landDotGroups.map(({ id, geometry }) => (
          <points
            key={id}
            geometry={geometry}
            onPointerOver={(event) => {
              if (variant !== "light") return;
              event.stopPropagation();
              setHoveredCountry(id);
            }}
            onPointerOut={() => {
              if (variant !== "light") return;
              setHoveredCountry((current) => (current === id ? null : current));
            }}
          >
            <pointsMaterial
              color={
                variant === "light" && hoveredCountry === id
                  ? theme.pin
                  : theme.dots
              }
              size={theme.dotSize}
              map={dotTexture ?? undefined}
              alphaTest={dotTexture ? 0.5 : 0}
              transparent={theme.dotOpacity < 1 || Boolean(dotTexture)}
              opacity={theme.dotOpacity}
              sizeAttenuation
              depthWrite
            />
          </points>
        ))}

        {theme.showArcs
          ? arcs.map((arc, i) => (
              <lineSegments key={i} geometry={arc}>
                <lineBasicMaterial
                  color={themes.dark.arc}
                  transparent
                  opacity={themes.dark.arcOpacity}
                />
              </lineSegments>
            ))
          : null}

        {productLocations.map((loc) => {
          const pos = latLngToVector3(loc.lat, loc.lng, 1.015);
          const normal = pos.clone().normalize();
          const active = activePin === loc.id;
          const pinRadius = variant === "light" ? 0.011 : 0.012;
          return (
            <group key={loc.id} position={pos}>
              <group
                position={normal.clone().multiplyScalar(0.02)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePin(active ? null : loc.id);
                }}
                onPointerOver={() => setActivePin(loc.id)}
                onPointerOut={() =>
                  setActivePin((current) =>
                    current === loc.id ? null : current,
                  )
                }
              >
                <mesh>
                  <sphereGeometry args={[pinRadius * 2.4, 16, 16]} />
                  <meshBasicMaterial
                    color={theme.pin}
                    transparent
                    opacity={0.12}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                  />
                </mesh>
                <mesh>
                  <sphereGeometry args={[pinRadius * 1.55, 16, 16]} />
                  <meshBasicMaterial
                    color={theme.pin}
                    transparent
                    opacity={0.28}
                    depthWrite={false}
                  />
                </mesh>
                <mesh>
                  <sphereGeometry args={[pinRadius, 16, 16]} />
                  <meshBasicMaterial color={theme.pin} />
                </mesh>
              </group>
              {active ? (
                <Html
                  distanceFactor={2.2}
                  position={normal.clone().multiplyScalar(0.075)}
                  className="pointer-events-none"
                >
                  <div
                    className={`w-max max-w-[140px] rounded-lg border px-2.5 py-2 shadow-[0_8px_24px_rgba(30,24,18,0.12)] backdrop-blur-xl ${theme.tooltipBg}`}
                  >
                    <p
                      className={`font-mono text-[7px] font-medium uppercase tracking-[0.16em] ${theme.tooltipMuted}`}
                    >
                      {loc.country}
                    </p>
                    <p className="mt-1 text-[10px] font-medium leading-tight">
                      {loc.label}
                    </p>
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
        enableZoom={false}
        rotateSpeed={0.45}
        onStart={() => {
          dragging.current = true;
          onDragStart?.();
        }}
        onEnd={() => {
          dragging.current = false;
          onDragEnd?.();
        }}
      />
    </>
  );
}

export function GlobeSceneCanvas({
  variant = "light",
  onDragStart,
  onDragEnd,
}: {
  variant?: GlobeVariant;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 3.1], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
      style={{ background: "transparent", cursor: "inherit" }}
      className="touch-none"
    >
      {variant === "dark" ? (
        <Stars radius={80} depth={40} count={1200} factor={3} fade speed={0.4} />
      ) : null}
      <Earth
        variant={variant}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      />
    </Canvas>
  );
}
