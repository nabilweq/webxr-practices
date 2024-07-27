// src/App.js
import React from 'react';
import './App.css';
import VideoBackground from './components/VideoBackground';
import ThreeDScene from './components/ThreeDScene';
import videoSrc from './v2.mp4';

function App() {
  return (
    <div className="App">
      <VideoBackground videoSrc={videoSrc} />
      <ThreeDScene modelPath="./cola.3ds" />
    </div>
  );
}

export default App;
