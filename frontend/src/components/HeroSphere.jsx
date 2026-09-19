import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const R = 1.7;
const PH = { lat: 15.8, lon: 121.6 };

const latLonToVec = (lat, lon) => {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  return new THREE.Vector3(
    R * Math.cos(la) * Math.cos(lo),
    R * Math.sin(la),
    -R * Math.cos(la) * Math.sin(lo)
  );
};

const NodeSphere = ({ color }) => {
  const group = useRef();
  const markerGroup = useRef();
  const markerRing = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  const { grid, dots, markerPos, baseRot } = useMemo(() => {
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
    const dotVerts = [];
    for (let lat = -75; lat <= 75; lat += 15) {
      for (let lon = 0; lon < 360; lon += 15) {
        const v = latLonToVec(lat, lon);
        dotVerts.push(v.x, v.y, v.z);
      }
    }
    const m = latLonToVec(PH.lat, PH.lon);
    return {
      grid: new Float32Array(lines),
      dots: new Float32Array(dotVerts),
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
        <lineBasicMaterial color={color} transparent opacity={0.2} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dots, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.028} color={color} transparent opacity={0.75} sizeAttenuation />
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
