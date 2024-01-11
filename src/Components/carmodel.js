// src/components/CarModel.js
import React from 'react';

const CarModel = ({ usdzUrl }) => {
  return (
    <div className="car-model-container">
      <model-viewer
        src={usdzUrl}
        alt="Car Model"
        camera-controls
        style={{ width: '30%', height: '30%' }}
      ></model-viewer>
    </div>
  );
};

export default CarModel;
