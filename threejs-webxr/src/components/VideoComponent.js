import React from 'react';

const VideoBackground = () => {
  return (
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
      }}
    >
      <source src="v2.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoBackground;
