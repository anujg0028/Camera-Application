import "./dashboard.css"
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import galeryLogo from '../../assets/Images/galeryLogo.png';
import { images } from '../../assets/Constant/constant.js';
import CameraModal from '../CameraModal/Modal.js'
import ImageList from '../../Context/ImageListContext.js';
import Shimmer from '../Shimmer/Shimmer.js';
import MonthCardContainer from "../MonthCardContainer/MonthCardContainer.js";
import camera from '../../assets/Images/camera.png'

const Dashboard = () => {

    const [photosList, setPhotoList] = useState([...images]);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <ImageList.Provider value={{ photosList, setPhotoList, setModalOpen }}>
            <div className="App">
                <div className="dashboard">
                    {modalOpen && <CameraModal />}
                    <div className="dashboardPageContainer">
                        <div className="navBarContainer">
                            <div className="galeryTitle">
                                <img id="logoImg" src={galeryLogo} alt={"Something went wrong"} />
                                <h3>Gallery</h3>
                            </div>
                            <div className="clickBtn">
                                <Button onClick={() => setModalOpen(true)} startIcon={<AddAPhotoIcon style={{fontWeight: '20px'}} />} size="small" ><span id="clickImageTitle">Click Image</span></Button>
                            </div>
                        </div>
                        <div className="mainBodyContainer">
                            {
                                photosList.length === 0 ? <Shimmer /> : (
                                    <div className="imageContainer">
                                        {photosList.length > 0 && photosList.map((photo, index) => (
                                            <MonthCardContainer param={photo} monthIndex={index} key={photo.month} />
                                        ))}
                                    </div>
                                )
                            }
                            <div className="clickFixedBtn">
                            {/* <Button onClick={() => setModalOpen(true)} startIcon={<AddAPhotoIcon />} size="larger" ></Button> */}
                            <img onClick={() => setModalOpen(true)} id='cameraLogo' src={camera} alt="No" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ImageList.Provider >
    )
};

export default Dashboard;