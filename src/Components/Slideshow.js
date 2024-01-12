import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

// Array of model objects with titles and image URLs
const models = [
  {
    url: "/Porsche.glb",
    title: "My dream car is a 911, this is my next car goal.",
    image: "/911-logo.png",
  },
  {
    url: "/Tesla.glb",
    title: "I currently drive a Tesla",
    image: "/t-logo.png",
  },
];

function Model({ url, ...props }) {
  const { scene } = useGLTF(url);

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

function Slideshow() {
  const carRef = useRef();
  const [rotationEnabled, setRotationEnabled] = useState(true);
  const [rotation, setRotation] = useState([0, Math.PI / 4, 0]);
  const [currentModelIndex, setCurrentModelIndex] = useState(0);

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
          prevRotation[2],
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

  const handleNext = () => {
    setCurrentModelIndex((prevIndex) => (prevIndex + 1) % models.length);
  };

  const handlePrev = () => {
    setCurrentModelIndex(
      (prevIndex) => (prevIndex - 1 + models.length) % models.length
    );
  };

  return (
    <div className="centered-slideshow-container">
      <div className="arrow left-arrow" onClick={handlePrev}>
        {"Back"}
      </div>
      <div className="title-container">
        {models[currentModelIndex].image && (
          <img
            alt={models[currentModelIndex].title}
            src={models[currentModelIndex].image}
          />
        )}
        <p>{models[currentModelIndex].title}</p>
      </div>
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 45 }}
        style={{
          position: "absolute",
          width: "150px",
          height: "150px",
        }}
      >
        <ambientLight intensity={0.5} />
        <PresentationControls
          speed={1.5}
          global
          zoom={1}
          polar={[-0.1, Math.PI / 4]}
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
            <Model
              scale={0.001}
              ref={carRef}
              rotation={rotation}
              // Use the current model from the array
              url={models[currentModelIndex].url}
            />
          </Stage>
        </PresentationControls>
      </Canvas>
      <div className="arrow right-arrow" onClick={handleNext}>
        {"Next"}
      </div>
    </div>
  );
}

export default Slideshow;
