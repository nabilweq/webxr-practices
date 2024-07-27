import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { VRButton, ARButton, useXR } from '@react-three/xr';
import { useDrag } from '@use-gesture/react';

// Load the GLTF model
const GLTFModel = ({ scale = [1, 1, 1], ...props }) => {
  const { scene } = useGLTF('/Duck.glb');
  return <primitive object={scene} scale={scale} {...props} />;
};

// Draggable and rotatable model component
const DraggableRotatableModel = () => {
  const groupRef = useRef();
  const bind = useDrag((state) => {
    const { offset: [x, y], movement: [mx, my] } = state;
    if (groupRef.current) {
      // Rotation
      groupRef.current.rotation.y += x / 100;
      groupRef.current.rotation.x -= y / 100;

      // Translation
      groupRef.current.position.x += mx / 100;
      groupRef.current.position.y -= my / 100;
    }
  });

  return (
    <group ref={groupRef} {...bind()}>
      <GLTFModel scale={[2, 2, 2]} /> {/* Adjust scale as needed */}
    </group>
  );
};

// Main scene component
const ThreeDScene = () => {
  const { xr } = useXR(); // Ensure WebXR API is being used correctly

  return (
    <>
      <VRButton /> {/* For VR */}
      <ARButton /> {/* For AR */}

      <Canvas>
        <ambientLight />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <DraggableRotatableModel />
        <OrbitControls 
          enableZoom={true} 
          zoomSpeed={0.5} 
          enableRotate={false} 
        />
      </Canvas>
    </>
  );
};

export default ThreeDScene;
