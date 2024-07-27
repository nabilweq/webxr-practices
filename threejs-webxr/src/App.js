import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { VRButton } from 'three/examples/jsm/vr/VRButton';
import VideoBackground from './components/VideoComponent';
import DraggableObject from './components/DraggableObject';
import Lights from './components/Lights';

const App = () => {
  useEffect(() => {
    const renderer = document.querySelector('canvas').__threeFiber?.renderer;
    if (renderer) {
      document.body.appendChild(VRButton.createButton(renderer));
    }
  }, []);

  return (
    <>
      <VideoBackground />
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} camera={{ position: [0, 0, 5], fov: 75 }}>
        <Lights />
        <DraggableObject />
      </Canvas>
    </>
  );
};

export default App;
