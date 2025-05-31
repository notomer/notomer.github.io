import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";
import "../Slideshow.css"

const models = [
  {
    url: "/Porsche.glb",
    title: "My dream car is a 911, this is my next car goal.",
    image: "/images/911-logo.png",
  },
  {
    url: "/Tesla.glb",
    title: "I currently drive a Tesla",
    image: "/images/t-logo.png",
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

    resetIdleTimer();

    return () => {
      cancelAnimationFrame(requestId);
      clearTimeout(idleTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="canvas-container">
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45 }}

      >
        <ambientLight intensity={0.5} />
        <PresentationControls
          speed={1.5}
          global
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
              url={models[currentModelIndex].url}
            />
          </Stage>
        </PresentationControls>
      </Canvas>
      </div>
      <div className="arrow left-arrow" onClick={handlePrev}>
       <img src="./images/arrowL.png" alt="Left Button" />
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
      <div className="arrow right-arrow" onClick={handleNext}>
      <img src="./images/arrowR.png" alt="Right Button" />
      </div>
    </div>
  );
}

export default Slideshow;
