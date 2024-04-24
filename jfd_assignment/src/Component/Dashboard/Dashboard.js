import "./dashboard.css"
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import galeryLogo from '../../assets/Images/galeryLogo.png';
import { images } from '../../assets/Constant/constant.js';
import ImageCard from '../ImageCard/ImageCard.js';
import CameraModal from '../CameraModal/Modal.js'
import ImageList from '../../Context/ImageListContext.js';

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
                            <Button className="clickBtn" onClick={() => setModalOpen(true)} startIcon={<AddAPhotoIcon />} size="small" ><span id="clickImageTitle">Click Image</span></Button>
                        </div>
                        <div className="mainBodyContainer">
                            <div className="imageContainer">
                                {photosList.length > 0 && photosList.map((photo, index) => (
                                    <ImageCard param={photo} index={index} key={photo.time} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ImageList.Provider >
    )
};

export default Dashboard;