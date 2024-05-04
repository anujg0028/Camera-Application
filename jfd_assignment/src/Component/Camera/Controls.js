import './camera.css'
import React from "react";
import Button from '@mui/material/Button';
import { useControls } from "react-zoom-pan-pinch";
import { TransformComponent } from "react-zoom-pan-pinch";
import Webcam from "react-webcam";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

const Controls = ({ elementRef, aspectRatio, cameraFace }) => {

    const { zoomIn, zoomOut } = useControls();
    const videoConstraints = {
        facingMode: cameraFace,
        aspectRatio: aspectRatio
    };

    return (
        <div className="cameraContainer">
            <Button id="zoomInBtn" onClick={() => zoomIn()} startIcon={< ZoomInIcon style={{ fontSize: '40px' }} />} size="large" ></Button>
            <div ref={elementRef}>
                <TransformComponent>
                    <Webcam
                        ref={elementRef}
                        id='webCam'
                        audio={false}
                        width={410 * videoConstraints.aspectRatio}
                        height={410}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                </TransformComponent>
            </div>
            <Button id="zoomOutBtn" onClick={() => zoomOut()} startIcon={<ZoomOutIcon style={{ fontSize: '40px' }} />} size="large" ></Button>
        </div>
    );
};

export default Controls
