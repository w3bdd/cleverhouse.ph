import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LAND_POINTS, PH_POINTS } from "../data/globePoints";

const R = 1.7;
const PH = { lat: 15.8, lon: 121.6 };

const latLonToVec = (lat, lon, r = R) => {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  return new THREE.Vector3(
    r * Math.cos(la) * Math.cos(lo),
    r * Math.sin(la),
    -r * Math.cos(la) * Math.sin(lo)
  );
};

const NodeSphere = ({ color }) => {
  const group = useRef();
  const markerGroup = useRef();
  const markerRing = useRef();
  const phMat = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  const { grid, land, ph, markerPos, baseRot } = useMemo(() => {
    const SEG = 72;
    const lines = [];
    for (let lat = -75; lat <= 75; lat += 15) {
      const pts = [];
      for (let i = 0; i <= SEG; i++) pts.push(latLonToVec(lat, (i / SEG) * 360));
      for (let i = 0; i < SEG; i++)
        lines.push(pts[i].x, pts[i].y, pts[i].z, pts[i + 1].x, pts[i + 1].y, pts[i + 1].z);
    }
    for (let lon = 0; lon < 360; lon += 15) {
      const pts = [];
      for (let i = 0; i <= SEG; i++) pts.push(latLonToVec(-90 + (i / SEG) * 180, lon));
      for (let i = 0; i < SEG; i++)
        lines.push(pts[i].x, pts[i].y, pts[i].z, pts[i + 1].x, pts[i + 1].y, pts[i + 1].z);
    }
    const landVerts = new Float32Array((LAND_POINTS.length / 2) * 3);
    for (let i = 0; i < LAND_POINTS.length; i += 2) {
      const v = latLonToVec(LAND_POINTS[i], LAND_POINTS[i + 1]);
      const o = (i / 2) * 3;
      landVerts[o] = v.x;
      landVerts[o + 1] = v.y;
      landVerts[o + 2] = v.z;
    }
    const phVerts = new Float32Array((PH_POINTS.length / 2) * 3);
    for (let i = 0; i < PH_POINTS.length; i += 2) {
      const v = latLonToVec(PH_POINTS[i], PH_POINTS[i + 1], R + 0.012);
      const o = (i / 2) * 3;
      phVerts[o] = v.x;
      phVerts[o + 1] = v.y;
      phVerts[o + 2] = v.z;
    }
    const m = latLonToVec(PH.lat, PH.lon);
    return {
      grid: new Float32Array(lines),
      land: landVerts,
      ph: phVerts,
      markerPos: m,
      baseRot: Math.atan2(-m.x, m.z),
    };
  }, []);

  useEffect(() => {
    if (markerGroup.current) {
      markerGroup.current.lookAt(markerPos.clone().multiplyScalar(2));
    }
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [markerPos]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = baseRot + Math.sin(t * 0.1) * 0.42;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.32 + mouse.current.y * 0.12, 0.04);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, mouse.current.x * 0.06, 0.04);
    if (phMat.current) {
      phMat.current.opacity = 0.75 + ((Math.sin(t * 2) + 1) / 2) * 0.25;
    }
    if (markerRing.current) {
      const s = 1 + ((Math.sin(t * 2.4) + 1) / 2) * 0.8;
      markerRing.current.scale.setScalar(s);
      markerRing.current.material.opacity = 0.9 - (s - 1) * 0.7;
    }
  });

  return (
    <group ref={group} rotation={[0.32, baseRot, 0]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[grid, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.08} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[land, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.022} color={color} transparent opacity={0.55} sizeAttenuation />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ph, 3]} />
        </bufferGeometry>
        <pointsMaterial ref={phMat} size={0.036} color="#FBBF24" transparent opacity={0.9} sizeAttenuation />
      </points>
      <group ref={markerGroup} position={markerPos}>
        <mesh>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#FBBF24" />
        </mesh>
        <mesh ref={markerRing}>
          <torusGeometry args={[0.1, 0.006, 8, 48]} />
          <meshBasicMaterial color="#FBBF24" transparent opacity={0.8} />
        </mesh>
      </group>
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
