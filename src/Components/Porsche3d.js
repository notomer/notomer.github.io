import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";


function Model(props) {
  const { scene } = useGLTF("/Porsche.glb");

  // Traverse through all children of the scene and disable shadows
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = false;
      child.receiveShadow = false;
      if (child.material) {
        child.material.castShadow = false;
        child.material.receiveShadow = false;
      }
    }
  });

  return <primitive object={scene} {...props} />;
}

function Porsche3d() {
  const carRef = useRef();
  const [rotationEnabled, setRotationEnabled] = useState(true);
  const [rotation, setRotation] = useState([0, Math.PI / 4., 0]);

  let idleTimeout;

  const resetIdleTimer = () => {
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      setRotationEnabled(true);
    }, 5000);
  };

  useEffect(() => {
    let requestId;
    let lastTimestamp = 0;

    const updateRotation = (timestamp) => {
      const elapsedMilliseconds = timestamp - lastTimestamp;

      if (rotationEnabled) {
        const rotationSpeed = 0.0001; // Adjust rotation speed as needed
        setRotation((prevRotation) => [
          prevRotation[0],
          prevRotation[1] + rotationSpeed * elapsedMilliseconds,
          prevRotation[2]
        ]);
      }

      lastTimestamp = timestamp;
      requestId = requestAnimationFrame(updateRotation);
    };

    if (rotationEnabled) {
      requestId = requestAnimationFrame(updateRotation);
    }

    // Initial idle timer setup
    resetIdleTimer();

    return () => {
      cancelAnimationFrame(requestId);
      clearTimeout(idleTimeout);
    };
  }, [rotationEnabled]);

  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ fov: 45 }}
      style={{ position: "absolute" }}
    >
      <ambientLight intensity={0.5} />
      <PresentationControls
        speed={1.5}
        global
        zoom={1}
        polar={[-0.1, Math.PI / 4.]}
        onPointerDown={() => {
          setRotationEnabled(true);
          resetIdleTimer();
        }}
        onPointerUp={() => {
          setRotationEnabled(false);
        }}
        onPointerLeave={() => {
          setRotationEnabled(false);
        }}
      >
        <Stage environment="">
          <Model scale={0.0006} ref={carRef} rotation={rotation} />
        </Stage>
      </PresentationControls>
    </Canvas>
  );
}

export default Porsche3d;
