// src/components/VideoBackground.js
import React from 'react';
import './VideoBackground.css';

const VideoBackground = ({ videoSrc }) => {
  return (
    <video autoPlay loop muted className="video-background">
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
};

export default VideoBackground;
