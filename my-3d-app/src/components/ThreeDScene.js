// src/components/ThreeDScene.js
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Model';

const ThreeDScene = ({ modelPath }) => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Model path={modelPath} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

export default ThreeDScene;
