import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
// import { ARButton } from 'three/examples/jsm/webxr/ARButton'; // Uncomment for AR

const ThreeJSScene = () => {
    const containerRef = useRef();

    useEffect(() => {
        const container = containerRef.current;
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.xr.enabled = true;

        container.appendChild(renderer.domElement);
        container.appendChild(VRButton.createButton(renderer));
        // container.appendChild(ARButton.createButton(renderer)); // Uncomment for AR

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 0);
        scene.add(directionalLight);

        let customObject;
        const loader = new GLTFLoader();
        loader.load(
            'Duck.glb', // Replace with the path to your GLB file
            (gltf) => {
                customObject = gltf.scene;
                scene.add(customObject);

                customObject.position.set(0, 0, 0);
                customObject.scale.set(1, 1, 1);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.error('An error happened', error);
            }
        );

        camera.position.z = 5;

        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        function animate() {
            renderer.setAnimationLoop(render);
        }

        function render() {
            renderer.render(scene, camera);
        }
        animate();

        function onMouseDown() {
            isDragging = true;
        }

        function onMouseMove(event) {
            if (isDragging && customObject) {
                const deltaMove = {
                    x: event.clientX - previousMousePosition.x,
                    y: event.clientY - previousMousePosition.y,
                };

                customObject.position.x += deltaMove.x * 0.01;
                customObject.position.y -= deltaMove.y * 0.01;
            }

            previousMousePosition = {
                x: event.clientX,
                y: event.clientY,
            };
        }

        function onMouseUp() {
            isDragging = false;
        }

        container.addEventListener('mousedown', onMouseDown);
        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseup', onMouseUp);

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener('resize', onWindowResize);

        return () => {
            window.removeEventListener('resize', onWindowResize);
            container.removeEventListener('mousedown', onMouseDown);
            container.removeEventListener('mousemove', onMouseMove);
            container.removeEventListener('mouseup', onMouseUp);
            container.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <video id="videoBackground" autoPlay muted loop style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src="v2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default ThreeJSScene;

