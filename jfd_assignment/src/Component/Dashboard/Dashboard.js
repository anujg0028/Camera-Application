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
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TickBtn from '../../Context/TickBtn';
import { toast } from 'react-toastify';

const Dashboard = () => {

    const [photosList, setPhotoList] = useState([...images]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [tickBtnValue, setTickBtnValue] = useState(0); 
    const [tickBtnPlace, setTickBtnPlace] = useState([]); 

    function objectExistsInArray(array, date) {
        if (Array.isArray(array)) {
            let newVal = {};
            for(let i in array)
            {
               if(array[i].date === date)
               {
                   newVal['dateIndex'] = i;
                   newVal['TotImages'] = array[i].images.length;
                   break;
               }
            }
            return newVal;
        } else {
            console.error("The provided array is not a valid array.");
            return false;
        }
    }
    
    const findMonthDatePhotos = (array,monthStr,dateStr) => {
        let obj = {};
        for(let i in array)
        {
            if(array[i].month === monthStr)
            {
                obj['monthIndex']=i;
                obj['dateVal'] = objectExistsInArray(array[i].photos,dateStr);
                break;
            }
        }
        return obj;
    }

    const hanldePhotoSelected = () => {
        if (tickBtnPlace.length === 0) return 0;
        let total = 0;
        for (let obj of tickBtnPlace) {
            total += findMonthDatePhotos(photosList,obj.month, obj.date).dateVal.TotImages;
        }
        return total;
    }

    const handleDelete = () => {
        try {
            // eslint-disable-next-line no-restricted-globals
            let result = confirm(`Are you sure you want to delete all ${hanldePhotoSelected()} photos!`);
            if (result) {

                let tempPhotoList = [...photosList];
                for(let i of tickBtnPlace)
                {
                    let tempObj = findMonthDatePhotos(tempPhotoList,i.month,i.date);
                    tempPhotoList[tempObj.monthIndex].photos.splice(tempObj.dateVal.dateIndex, 1);
    
                    if (tempPhotoList[tempObj.monthIndex].photos.length === 0) {
                        tempPhotoList = tempPhotoList.filter((monthImg) => monthImg.photos.length > 0);
                    }
                }
                setPhotoList(tempPhotoList);
                setTickBtnPlace([]);
                setTickBtnValue(0);
                setModalDeleteOpen(false);
                toast.success("Images deleted successfully")
            }
        }
        catch (e) {
            toast.error("Something went wrong please try again")
        }
    }

    return (
        <ImageList.Provider value={{ photosList, setPhotoList, setModalOpen, setModalDeleteOpen, modalDeleteOpen }}>
            <TickBtn.Provider value={{ tickBtnValue, setTickBtnValue, tickBtnPlace, setTickBtnPlace }}>
                <div className="App">
                    <div className="dashboard">
                        {modalDeleteOpen && (
                            <div className="deleteContainer">
                                <div className="deleteTitle">
                                    <Button id='crossLogoBtn' onClick={() => { setTickBtnPlace([]); setTickBtnValue(0); setModalDeleteOpen(false) }} startIcon={<ClearIcon style={{ fontSize: '25px' }} />} size="large" ></Button>
                                    <h3> {hanldePhotoSelected()} Photos Selected</h3>
                                </div>
                                <div className="deleteBtn">
                                    <Button onClick={() => handleDelete()} startIcon={<DeleteForeverIcon style={{ fontSize: '35px' }} />} size="large" ></Button>
                                </div>
                            </div>
                        )}
                        {modalOpen && <CameraModal />}
                        <div className="dashboardPageContainer">
                            <div className="navBarContainer">
                                <div className="galeryTitle">
                                    <img id="logoImg" src={galeryLogo} alt={"Something went wrong"} />
                                    <h3>Gallery</h3>
                                </div>
                                <div className="clickBtn">
                                    <Button onClick={() => setModalOpen(true)} startIcon={<AddAPhotoIcon style={{ fontWeight: '20px' }} />} size="small" ><span id="clickImageTitle">Click Image</span></Button>
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
                            <div className="footer">
                                <p>Developed by Anuj Garg</p>
                            </div>
                        </div>
                    </div>
                </div>
            </TickBtn.Provider>
        </ImageList.Provider >
    )
};

export default Dashboard;