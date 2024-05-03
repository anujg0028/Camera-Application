import './camera.css'
import React from "react";
import plusLogo from '../../assets/Images/plusLogo.jpeg'
import Button from '@mui/material/Button';
import minusLogo from '../../assets/Images/minusLogo.jpeg'
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
             <Button id="zoomInBtn" onClick={() => zoomIn()} startIcon={< ZoomInIcon style={{fontSize: '40px'}} />} size="large" ></Button>
            <TransformComponent>
                <div ref={elementRef}>
                    <Webcam
                        ref={elementRef}
                        id='webCam'
                        audio={false}
                        width={400 * videoConstraints.aspectRatio}
                        height={400}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                </div>
            </TransformComponent>
            <Button id="zoomOutBtn" onClick={() => zoomOut()} startIcon={<ZoomOutIcon style={{fontSize: '40px'}} />} size="large" ></Button>
        </div>
    );
};

export default Controls
