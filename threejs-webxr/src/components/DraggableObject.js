import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const DraggableObject = () => {
  const [model, setModel] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
  const gltfLoader = useRef(new GLTFLoader());

  useEffect(() => {
    gltfLoader.current.load('Duck.glb', (gltf) => {
      setModel(gltf.scene);
    });
  }, []);

  useFrame(({ mouse }) => {
    if (dragging && model) {
      const deltaMove = {
        x: mouse.x - previousMousePosition.x,
        y: mouse.y - previousMousePosition.y
      };
      model.position.x += deltaMove.x * 10;
      model.position.y -= deltaMove.y * 10;
      setPreviousMousePosition({ x: mouse.x, y: mouse.y });
    }
  });

  return (
    <group
      onPointerDown={() => setDragging(true)}
      onPointerUp={() => setDragging(false)}
      onPointerMove={(event) => {
        if (dragging) {
          setPreviousMousePosition({ x: event.clientX, y: event.clientY });
        }
      }}
    >
      {model && <primitive object={model} />}
    </group>
  );
};

export default DraggableObject;

