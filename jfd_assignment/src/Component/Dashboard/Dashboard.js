import "./dashboard.css"
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import galeryLogo from '../../assets/Images/galeryLogo.png';
import { images } from '../../assets/Constant/constant.js';
import ImageCard from '../ImageCard/ImageCard.js';

// import Camera from "../Camera/Camera.js";
//import NoteBox from '../Component/NoteBoxArea/NoteBox';
// import { toast } from "react-toastify";

import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';

const Dashboard = () => {

    const [photosList, setPhotoList] = useState(images);
    const [flag, setFlag] = useState(false);

    const [zoomLevel, setZoomLevel] = useState(1.0);

    function handleTakePhotoAnimationDone(dataUri) {
        console.log(dataUri);
        const blob = dataURItoBlob(dataUri);
        const blobUrl = URL.createObjectURL(blob);

        // Update photosList with the Blob URL
        setPhotoList([...photosList, blobUrl]);
        //setPhotoList([...photosList, photosList.push(dataUri)])
    }

    // Function to convert data URI to Blob
    function dataURItoBlob(dataURI) {
        setFlag(false)
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeString });
    }

    function handleCameraStart (stream) {
        console.log('handleCameraStart');
      }
    
      function handleCameraStop () {
        console.log('handleCameraStop');
      }

      const handleZoomIn = () => {
        if (zoomLevel < 2.0) { // Maximum zoom level (200%)
          setZoomLevel(zoomLevel + 0.1); // Increase zoom by 10%
        }
      };
    
      // Zoom Out Button Click Handler
      const handleZoomOut = () => {
        if (zoomLevel > 1.0) { // Minimum zoom level (100%)
          setZoomLevel(zoomLevel - 0.1); // Decrease zoom by 10%
        }
      };
    
    return (
        <div className="dashboard">
            <div className="dashboardPageContainer">
                <div className="navBarContainer">
                    <div className="galeryTitle">
                        <img id="logoImg" src={galeryLogo} />
                        <h3>Galery</h3>
                    </div>
                    <Button className="clickBtn" onClick={() => setFlag(true)} startIcon={<AddAPhotoIcon />} size="small" ><span id="clickImageTitle">Click Image</span></Button>
                </div>
                <div className="mainBodyContainer">
                    <div className="imageContainer">
                        {photosList.length > 0 && photosList.map((photo, index) => (
                            <ImageCard param={photo} key={index} />
                        ))}
                        {/* <Camera photosList={photosList} setPhotoList={setPhotoList} /> */}
                        {
                            flag ? (<><Camera 
                                onTakePhotoAnimationDone={(dataUri) => { handleTakePhotoAnimationDone(dataUri); }}
                                idealFacingMode={FACING_MODES.ENVIRONMENT}
                                idealResolution={{ width: 640, height: 480 }}
                                imageType={IMAGE_TYPES.JPG}
                                imageCompression={0.97}
                                isMaxResolution={true}
                                isImageMirror={false}
                                isSilentMode={false}
                                isDisplayStartCameraError={true}
                                isFullscreen={false}
                                sizeFactor={zoomLevel}
                                onCameraStart={(stream) => { handleCameraStart(stream); }}
                                onCameraStop={() => { handleCameraStop(); }} 
                            /> 
                                <Button onClick={handleZoomIn} size="small">Zoom In</Button>
                                <Button onClick={handleZoomOut} size="small">Zoom Out</Button> </>): ''
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;