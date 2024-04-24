import "./camera.css"
import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CameraIcon from '@mui/icons-material/Camera';
import CameraswitchIcon from '@mui/icons-material/Cameraswitch';
import Controls from './Controls'
import { TransformWrapper } from "react-zoom-pan-pinch";
import html2canvas from 'html2canvas';

const Camera = ({ photosList, setPhotoList, setModalOpen }) => {

    const elementRef = useRef(null);
    const [aspectRatio, setAspectRatio] = useState(1.7777778);
    const [cameraFace, setCameraFace] = useState("user");
    const [numberOfCamera, setNumberOfCamera] = useState(0);

    const handleChange = (event) => setAspectRatio(event.target.value);

    useEffect(() => {
        const getDevices = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const frontFacingCameras = devices.filter(device => device.kind === "videoinput");
            setNumberOfCamera(frontFacingCameras.length);
        }
        getDevices();
    }, []);

    const handleFaceSwitch = async () => {
        if (cameraFace === "user") setCameraFace("environment")
        else setCameraFace("user");
    }
    const captureScreenshot = async () => {
        const canvas = await html2canvas(elementRef.current);
        const image = canvas.toDataURL();
        setPhotoList([...photosList, image]);
        setModalOpen(false)
    };

    return (<>
        <TransformWrapper
            initialScale={1}
        >
            {({ zoomIn, zoomOut }) => (
                <div className="cameraHolder">
                    <div>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Aspect Ratio</InputLabel>
                            <Select
                                style={{ width: "100%" }}
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={aspectRatio}
                                onChange={handleChange}
                                label="Aspect Ratio"
                            >
                                <MenuItem value={1.7777778}>16:9</MenuItem>
                                <MenuItem value={1.3333333}>4:3</MenuItem>
                                <MenuItem value={1}>1:1</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Controls elementRef={elementRef} aspectRatio={aspectRatio} cameraFace={cameraFace} />
                    <div className="controlBtn">
                        <Button onClick={captureScreenshot} startIcon={<CameraIcon />} size="large" >Click</Button>
                        {
                            numberOfCamera>1 ? <Button onClick={handleFaceSwitch} startIcon={<CameraswitchIcon />} size="large" ></Button> : null
                        }
                    </div>
                </div>
            )}
        </TransformWrapper>
    </>
    )
}

export default Camera





// {/* <Webcam
//                             audio={false}
//                             screenshotFormat="image/jpeg"
//                             width={400}
//                             videoConstraints={videoConstraints}
//                         >
//                             {({ getScreenshot }) => (<>
//                                 <button
//                                     onClick={() => {
//                                         const imageSrc = getScreenshot();
//                                         setPhotoList([...photosList, imageSrc]);
//                                         setModalOpen(false)
//                                     }}
//                                 >
//                                     Capture photo
//                                 </button>
//                             </>)}

//                         </Webcam> */}