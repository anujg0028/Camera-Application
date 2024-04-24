import "./dashboard.css"
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import galeryLogo from '../../assets/Images/galeryLogo.png';
import { images } from '../../assets/Constant/constant.js';
import ImageCard from '../ImageCard/ImageCard.js';
import CameraModal from '../CameraModal/Modal.js'

const Dashboard = () => {

    const [photosList, setPhotoList] = useState(images);
    const [modalOpen, setModalOpen] = useState(false);
    console.log("dsdhdbhbd    ",photosList)

    return (
        <div className="dashboard">
            {modalOpen && <CameraModal setModalOpen={setModalOpen} photosList={photosList} setPhotoList={setPhotoList} />}
            <div className="dashboardPageContainer">
                <div className="navBarContainer">
                    <div className="galeryTitle">
                        <img id="logoImg" src={galeryLogo} alt={"Something went wrong"} />
                        <h3>Gallery</h3>
                    </div>
                    <Button className="clickBtn" onClick={() => setModalOpen(true)} startIcon={<AddAPhotoIcon />} size="small" ><span id="clickImageTitle">Click Image</span></Button>
                </div>
                <div className="mainBodyContainer">
                    <div className="imageContainer">
                        {photosList.length > 0 && photosList.map((photo, index) => (
                            <ImageCard param={photo} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;