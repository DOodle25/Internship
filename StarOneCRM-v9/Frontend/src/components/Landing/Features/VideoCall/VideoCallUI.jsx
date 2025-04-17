// src/features/VideoCall/VideoCallUI.jsx
import React from 'react';
import VideoImage from '../../../../assets/images/video.png';

export default function VideoCallUI() {
  return (
    <img
      src={VideoImage}
      alt="Video Call"
      style={{ width: '100%' }}
    />
  );
}
