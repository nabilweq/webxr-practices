import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
// import { ARButton } from 'three/examples/jsm/webxr/ARButton'; // Uncomment for AR

const ThreeJSScene = () => {
    const containerRef = useRef();
    const [object, setObject] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
    const [isModelLoaded, setIsModelLoaded] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = container.querySelector('#threejsCanvas');
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio); // Improve rendering quality
        renderer.xr.enabled = true;

        // Add VR button
        const vrButton = VRButton.createButton(renderer);
        document.body.appendChild(vrButton);

        // Add AR button if needed
        // const arButton = ARButton.createButton(renderer);
        // document.body.appendChild(arButton); // Uncomment for AR

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 1, 0);
        scene.add(directionalLight);

        const loader = new GLTFLoader();
        loader.load(
            '/Duck.glb', // Replace with the path to your GLB file
            (gltf) => {
                const loadedObject = gltf.scene;
                scene.add(loadedObject);
                loadedObject.position.set(0, 0, 0);
                loadedObject.scale.set(1, 1, 1);
                setObject(loadedObject);
                setIsModelLoaded(true); // Model is loaded
            },
            (xhr) => {
                const percentLoaded = (xhr.loaded / xhr.total) * 100;
                console.log(`${percentLoaded.toFixed(2)}% loaded`);
                if (percentLoaded >= 100) {
                    console.log("Loading complete");
                }
            },
            (error) => {
                console.error('An error happened', error);
            }
        );

        camera.position.z = 5;

        function animate() {
            if (isModelLoaded) {
                renderer.setAnimationLoop(render);
            } else {
                requestAnimationFrame(animate);
            }
        }

        function render() {
            if (object) {
                // Rotate the object continuously
                object.rotation.x += 0.01;
                object.rotation.y += 0.01;
            }
            renderer.render(scene, camera);
        }
        animate();

        function onMouseDown(event) {
            setIsDragging(true);
        }

        function onMouseMove(event) {
            if (isDragging && object) {
                const deltaMove = {
                    x: event.clientX - previousMousePosition.x,
                    y: event.clientY - previousMousePosition.y,
                };

                object.rotation.y += deltaMove.x * 0.01;
                object.rotation.x += deltaMove.y * 0.01;
            }

            setPreviousMousePosition({
                x: event.clientX,
                y: event.clientY,
            });
        }

        function onMouseUp() {
            setIsDragging(false);
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

            // Remove VR and AR buttons
            if (vrButton.parentElement === document.body) {
                document.body.removeChild(vrButton);
            }
            // if (arButton.parentElement === document.body) { // Uncomment for AR
            //     document.body.removeChild(arButton);
            // }
        };
    }, [object, isDragging, previousMousePosition, isModelLoaded]);

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <video
                id="videoBackground"
                autoPlay
                muted
                loop
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0
                }}
            >
                <source src="/v2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <canvas
                id="threejsCanvas"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1
                }}
            ></canvas>
        </div>
    );
};

export default ThreeJSScene;
