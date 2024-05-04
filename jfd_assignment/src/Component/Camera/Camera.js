import "./camera.css"
import React, { useState, useRef, useEffect, useContext } from 'react'
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
import ImageList from '../../Context/ImageListContext.js';
import moment from 'moment';


const Camera = () => {

    const { photosList, setPhotoList, setModalOpen } = useContext(ImageList);
    const [aspectRatio, setAspectRatio] = useState(9/16);
    const elementRef = useRef(null);
    const [cameraFace, setCameraFace] = useState("user");
    const [numberOfCamera, setNumberOfCamera] = useState(0);

    const handleChange = (event) => setAspectRatio(event.target.value);

    useEffect(() => {
        const getDevices = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const frontFacingCameras = devices.filter(device => device.kind === "videoinput");
                setNumberOfCamera(frontFacingCameras.length);
            }
            catch (e) {
                console.log(e);
            }
        }
        getDevices();
    }, []);

    const handleFaceSwitch = async () => {
        if (cameraFace === "user") setCameraFace("environment")
        else setCameraFace("user");
    }

    const currentDateTime = () => {
        try {
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const year = now.getFullYear().toString().slice(-2);
            const hour = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const formattedDateTime = `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
            return formattedDateTime;
        }
        catch (e) {
            console.log(e);
            return "";
        }
    }

    const captureScreenshot = async () => {
        try {
            const canvas = await html2canvas(elementRef.current);
            const image = canvas.toDataURL();
            const dateTime = currentDateTime();
            const date = moment();
            const monthYear = date.format('MMMM YYYY');

            if (photosList.length > 0 && photosList[0].month === monthYear) {
                if (photosList[0].photos[0].date === date.format('DD MMMM')) {
                    const newPhotoList = [...photosList];
                    newPhotoList[0].photos[0].images.push({ time: dateTime, src: image, aspectRatio: aspectRatio });
                    setPhotoList(newPhotoList);
                }
                else {
                    const newPhotoList = [...photosList];
                    newPhotoList[0].photos = [{ date: date.format('DD MMMM'), images: [{ time: dateTime, src: image, aspectRatio: aspectRatio }] }, ...newPhotoList[0].photos]
                }
            }
            else {
                let newObj = {
                    month: monthYear,
                    photos: [{ date: date.format('DD MMMM'), images: [{ time: dateTime, src: image, aspectRatio: aspectRatio }] }]
                };
                setPhotoList([newObj, ...photosList]);
            }
            setModalOpen(false);
            toast.success("Photo clicked successfully");
        }
        catch (e) {
            toast.error("Error occur: ", e)
            console.log(e);
        }
    };

    return (<>
        <TransformWrapper
            initialScale={1}
        >
            {({ zoomIn, zoomOut }) => (
                <div className="cameraHolder">
                    <div className='aspect'>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Aspect Ratio</InputLabel>
                            <Select
                                style={{ width: "90%" }}
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={aspectRatio}
                                onChange={handleChange}
                                label="Aspect Ratio"
                            >
                                <MenuItem value={9/16}>16:9</MenuItem>
                                <MenuItem value={3/4}>3:4</MenuItem>
                                <MenuItem value={1}>1:1</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Controls elementRef={elementRef} aspectRatio={aspectRatio} cameraFace={cameraFace} />
                    <Button id='ClickBtn' onClick={captureScreenshot} startIcon={<CameraIcon style={{fontSize: '40px'}} />} size="large" ></Button>
                    {
                        numberOfCamera > 1 ? <Button id='switchBtn' onClick={handleFaceSwitch} startIcon={< CameraswitchIcon style={{fontSize: '40px'}} />} size="large" ></Button> : <Button disabled id='switchDisableBtn' onClick={handleFaceSwitch} startIcon={< CameraswitchIcon style={{fontSize: '40px'}} />} size="large" ></Button> 
                    }

                </div>
            )}
        </TransformWrapper>
    </>
    )
}

export default Camera