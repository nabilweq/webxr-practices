import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';

const GLTFModel = () => {
  const { scene } = useGLTF('/Duck.glb');

  return (
    <primitive object={scene} />
  );
};

const RotatableModel = () => {
  const meshRef = React.useRef();
  const bind = useDrag((state) => {
    const { offset: [x, y] } = state;
    meshRef.current.rotation.y += x / 100;
    meshRef.current.rotation.x -= y / 100;
  });

  return (
    <group ref={meshRef} {...bind()}>
      <GLTFModel />
    </group>
  );
};

const ThreeDScene = () => {
  return (
    <Canvas>
      <ambientLight />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <RotatableModel />
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeDScene;
