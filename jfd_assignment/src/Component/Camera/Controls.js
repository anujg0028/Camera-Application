import './camera.css'
import React from "react";
import plusLogo from '../../assets/Images/plusLogo.jpeg'
import minusLogo from '../../assets/Images/minusLogo.jpeg'
import { useControls } from "react-zoom-pan-pinch";
import { TransformComponent } from "react-zoom-pan-pinch";
import Webcam from "react-webcam";

const Controls = ({elementRef, aspectRatio, cameraFace }) => {

    const { zoomIn, zoomOut } = useControls();
    const videoConstraints = {
        width: 1380,
        height: 820,
        facingMode: cameraFace,
        aspectRatio: aspectRatio
    };

    return (
        <div className="cameraContainer">
            <button className="zoomBtn" onClick={() => zoomIn()}><img className="zoomLogo" src={plusLogo} alt="+"></img></button>
            <div ref={elementRef}>
                <TransformComponent>
                    <Webcam
                    id='webCam'
                        audio={false}
                        height={400}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                </TransformComponent>
            </div>
            <button className="zoomBtn" onClick={() => zoomOut()}><img className="zoomLogo" src={minusLogo} alt="-"></img></button>
        </div>
    );
};

export default Controls
