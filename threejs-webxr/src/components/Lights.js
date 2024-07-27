import React from 'react';
import { AmbientLight, DirectionalLight } from '@react-three/fiber';

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 0]} intensity={0.5} />
    </>
  );
};

export default Lights;

