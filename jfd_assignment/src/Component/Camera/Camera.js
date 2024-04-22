import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const Camera = ({ photosList, setPhotoList }) => {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Use imageSrc - you can send it to a server, save it locally, etc.
    console.log(imageSrc);
    setPhotoList([...photosList, photosList.push(imageSrc)])
  }, [webcamRef]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
        videoConstraints={{ facingMode: 'environment' }} // Use 'user' for front camera
      />
      <button onClick={capture}>Capture Photo</button>
    </div>
  );
};

export default Camera;
