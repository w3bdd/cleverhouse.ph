import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NodeSphere = ({ color }) => {
  const group = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  const { points, lines } = useMemo(() => {
    const N = 240;
    const R = 1.7;
    const pts = [];
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      pts.push(
        new THREE.Vector3(
          R * Math.sin(phi) * Math.cos(theta),
          R * Math.cos(phi),
          R * Math.sin(phi) * Math.sin(theta)
        )
      );
    }
    const lineVerts = [];
    pts.forEach((p, i) => {
      pts
        .map((q, j) => ({ j, d: p.distanceTo(q) }))
        .filter((x) => x.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2)
        .forEach(({ j }) => lineVerts.push(p.x, p.y, p.z, pts[j].x, pts[j].y, pts[j].z));
    });
    return {
      points: new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z])),
      lines: new Float32Array(lineVerts),
    };
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.07;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.current.y * 0.18, 0.04);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, mouse.current.x * 0.08, 0.04);
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.04} color={color} transparent opacity={0.9} sizeAttenuation />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.16} />
      </lineSegments>
    </group>
  );
};

export const HeroSphere = ({ color = "#0284C7" }) => (
  <Canvas
    camera={{ position: [0, 0, 4.4], fov: 45 }}
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: true }}
    style={{ pointerEvents: "none" }}
  >
    <NodeSphere color={color} />
  </Canvas>
);
