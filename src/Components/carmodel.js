// src/components/CarModel.js
import React from 'react';

const CarModel = ({ usdzUrl }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <model-viewer
        src={usdzUrl}
        alt="Car Model"
        camera-controls
        style={{ width: '100%', height: '100%' }}
      ></model-viewer>
    </div>
  );
};

export default CarModel;
