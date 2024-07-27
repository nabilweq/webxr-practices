// src/components/Model.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { TDSLoader } from 'three-stdlib';

const Model = ({ path }) => {
  const modelRef = useRef();
  const model = useLoader(TDSLoader, path);

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.1;
    }
  });

  return <primitive ref={modelRef} object={model} scale={0.1} />;
};

export default Model;
