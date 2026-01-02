
import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useGame } from './GameContext';

const Robot = () => {
  const { theme } = useGame();
  const group = useRef<THREE.Group>(null);
  const headGroup = useRef<THREE.Group>(null);
  const visor = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const leftBlade = useRef<THREE.Mesh>(null);
  const rightBlade = useRef<THREE.Mesh>(null);
  
  const mouseVelocity = useRef(0);
  const prevMouse = useRef(new THREE.Vector2(0, 0));
  const smoothProximity = useRef(0);

  useFrame((state) => {
    if (!group.current || !headGroup.current || !visor.current || !core.current || !leftBlade.current || !rightBlade.current) return;
    
    // Safety check for mouse and viewport in the current state
    const { mouse, viewport } = state;
    if (!mouse || !viewport) return;

    const time = state.clock.elapsedTime;

    const currentMouse = new THREE.Vector2(mouse.x, mouse.y);
    const velocity = currentMouse.distanceTo(prevMouse.current) * 45; 
    mouseVelocity.current = THREE.MathUtils.lerp(mouseVelocity.current, velocity, 0.04);
    prevMouse.current.copy(currentMouse);

    const distFromCenter = Math.sqrt(mouse.x ** 2 + mouse.y ** 2);
    const targetProximity = Math.max(0, 1 - distFromCenter);
    smoothProximity.current = THREE.MathUtils.lerp(smoothProximity.current, targetProximity, 0.02);

    const targetX = (mouse.y * viewport.height) / 30;
    const targetY = (mouse.x * viewport.width) / 30;
    
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -targetX, 0.05);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetY, 0.05);

    const floatSpeed = 0.8 + (smoothProximity.current * 0.8);
    const floatAmp = 0.12 + (smoothProximity.current * 0.08);
    group.current.position.y = Math.sin(time * floatSpeed) * floatAmp;
    group.current.rotation.z = Math.cos(time * floatSpeed * 0.5) * 0.03 * smoothProximity.current;

    const baseVisorIntensity = theme === 'dark' ? 1.2 : 0.8;
    const pulse = Math.sin(time * 2.5) * 0.3;
    const proximityGlow = smoothProximity.current * (theme === 'dark' ? 2.5 : 1.5); 
    const movementGlow = mouseVelocity.current * 0.4;
    
    const finalVisorIntensity = baseVisorIntensity + pulse + proximityGlow + movementGlow;
    if (visor.current.material instanceof THREE.MeshStandardMaterial) {
      visor.current.material.emissiveIntensity = finalVisorIntensity;
    }

    core.current.scale.setScalar(1 + Math.sin(time * 10) * 0.02 + (smoothProximity.current * 0.05));

    const bladeAngle = Math.sin(time * floatSpeed) * 0.05;
    leftBlade.current.rotation.z = 0.2 + bladeAngle + (mouseVelocity.current * 0.05);
    rightBlade.current.rotation.z = -0.2 - bladeAngle - (mouseVelocity.current * 0.05);
  });

  const bodyColor = theme === 'dark' ? '#080808' : '#e2e8f0';
  const bladeColor = theme === 'dark' ? '#111' : '#cbd5e1';

  return (
    <group ref={group}>
      <mesh ref={core} position={[0, -0.2, 0]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={theme === 'dark' ? 2 : 1} />
        <pointLight color="#22d3ee" intensity={theme === 'dark' ? 3 : 1} distance={2} />
      </mesh>

      <group ref={headGroup}>
        <mesh position={[0, -0.4, 0.1]}>
          <boxGeometry args={[1.2, 0.5, 0.9]} />
          <meshStandardMaterial color={bodyColor} roughness={0.8} metalness={0.2} />
        </mesh>

        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.4, 0.4, 1.1]} />
          <meshStandardMaterial color={bodyColor} roughness={0.8} metalness={0.2} />
        </mesh>

        <mesh ref={visor} position={[0, 0.35, 0.3]}>
          <boxGeometry args={[1.42, 0.7, 0.6]} />
          <meshStandardMaterial 
            color="#000000" 
            emissive="#22d3ee" 
            transparent 
            opacity={0.9}
            roughness={0}
          />
        </mesh>

        <mesh position={[0, 0.75, -0.1]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[1.3, 0.3, 1.0]} />
          <meshStandardMaterial color={bodyColor} roughness={0.8} metalness={0.2} />
        </mesh>

        <mesh ref={leftBlade} position={[-0.75, 0.4, -0.2]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.1, 1.0, 0.4]} />
          <meshStandardMaterial color={bladeColor} metalness={0.8} roughness={0.1} />
        </mesh>
        <mesh ref={rightBlade} position={[0.75, 0.4, -0.2]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.1, 1.0, 0.4]} />
          <meshStandardMaterial color={bladeColor} metalness={0.8} roughness={0.1} />
        </mesh>
      </group>

      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[0.15, 0.4, 0.4, 6]} />
        <meshStandardMaterial color={theme === 'dark' ? '#1a1a1a' : '#94a3b8'} roughness={1} metalness={0} />
      </mesh>

      <Float speed={2.5} rotationIntensity={1} floatIntensity={0.5}>
        <mesh rotation={[Math.PI / 2.1, 0, 0]} position={[0, -0.3, 0]}>
          <torusGeometry args={[1.8, 0.008, 16, 64]} />
          <meshStandardMaterial color="#22d3ee" transparent opacity={0.4} emissive="#22d3ee" emissiveIntensity={0.5} />
        </mesh>
      </Float>

      <group>
        {Array.from({ length: 12 }).map((_, i) => (
          <Float key={i} speed={1.5 + Math.random()} rotationIntensity={4} floatIntensity={1.5}>
            <mesh position={[(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5]}>
              <boxGeometry args={[0.015, 0.015, 0.015]} />
              <meshBasicMaterial color="#22d3ee" transparent opacity={theme === 'dark' ? 0.3 : 0.6} />
            </mesh>
          </Float>
        ))}
      </group>
    </group>
  );
};

const RobotScene: React.FC = () => {
  const { theme } = useGame();
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas shadows gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={theme === 'dark' ? 0.4 : 1.2} />
        <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={theme === 'dark' ? 150 : 80} castShadow color="#22d3ee" />
        <pointLight position={[-5, -5, -5]} intensity={theme === 'dark' ? 40 : 20} color="#22d3ee" />
        <Robot />
      </Canvas>
    </div>
  );
};

export default RobotScene;
