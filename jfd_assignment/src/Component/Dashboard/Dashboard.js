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
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TickBtn from '../../Context/TickBtn';
import { toast } from 'react-toastify';
import DownloadIcon from '@mui/icons-material/Download';
import DriveFolderUploadRoundedIcon from '@mui/icons-material/DriveFolderUploadRounded';
import { handleFileSelect } from '../../Utils/fileUploadingFunc.js';
import { savePhotoToFileSystem } from '../../Utils/fileDownloadingFunc.js';
import { hanldePhotoSelected, findMonthDatePhotos, hanldleSingleImageSearch } from '../../Utils/tickBtnFunc.js';

const Dashboard = () => {

    const [photosList, setPhotoList] = useState([...images]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [tickBtnValue, setTickBtnValue] = useState(0);
    const [tickBtnPlace, setTickBtnPlace] = useState([]);
    const [singleTickBtn, setSingleTickBtn] = useState([]);

    const handleDownload = () => {
        try {

            const selectedPhotos = [];
            for (let obj of tickBtnPlace) {
                const monthPhotos = findMonthDatePhotos(photosList, obj.month, obj.date);
                let array = photosList[monthPhotos.monthIndex].photos[monthPhotos.dateVal.dateIndex].images;
                for (let i in array) {
                    selectedPhotos.push({ src: array[i].src, name: `${obj.month}_${obj.date}_${i}` });
                }
            }
            if (singleTickBtn.length > 0) {
                for (let obj of singleTickBtn) {
                    const monthPhotos = findMonthDatePhotos(photosList, obj.month, obj.date);
                    let array = photosList[monthPhotos.monthIndex].photos[monthPhotos.dateVal.dateIndex].images;
                    for (let i in array) {
                        if (array[i].time === obj.index) {
                            selectedPhotos.push({ src: array[i].src, name: `${obj.month}_${obj.date}_${i}` });
                            break;
                        }
                    }
                }
            }
            if (selectedPhotos.length === 0) {
                toast.error("No photos selected for download.");
                return;
            }

            if ('showDirectoryPicker' in window) {
                // eslint-disable-next-line no-undef
                showDirectoryPicker()
                    .then((directoryHandle) => {
                        selectedPhotos.forEach((photo) => {
                            savePhotoToFileSystem(directoryHandle, photo);
                        });
                        toast.success("Photos downloaded successfully!");
                        setModalDeleteOpen(false);
                        setTickBtnValue(0);
                        setTickBtnPlace([]);
                        setSingleTickBtn([]);
                    })
                    .catch((error) => {
                        toast.error("Error selecting directory: " + error.message);
                    });
            } else {
                toast.error("Your browser does not support downloading files directly to your file system.");
            }
        } catch (error) {
            toast.error("Error downloading photos: " + error.message);
        }
    };

    const handleDelete = () => {
        try {
            // eslint-disable-next-line no-restricted-globals
            let result = confirm(`Are you sure you want to delete all ${hanldePhotoSelected(photosList,tickBtnPlace,singleTickBtn)} photos!`);
            if (result) {
                let tempPhotoList = [...photosList];
                for (let i of tickBtnPlace) {
                    let tempObj = findMonthDatePhotos(tempPhotoList, i.month, i.date);
                    tempPhotoList[tempObj.monthIndex].photos.splice(tempObj.dateVal.dateIndex, 1);

                    if (tempPhotoList[tempObj.monthIndex].photos.length === 0) {
                        tempPhotoList = tempPhotoList.filter((monthImg) => monthImg.photos.length > 0);
                    }
                }
                for (let i of singleTickBtn) {
                    let tempObj = hanldleSingleImageSearch(tempPhotoList, i.month, i.date, i.index);
                    tempPhotoList[tempObj.monthIndex].photos[tempObj.dateIndex].images.splice(tempObj.photoIndex, 1);

                    if (tempPhotoList[tempObj.monthIndex].photos[tempObj.dateIndex].images.length === 0) {
                        tempPhotoList[tempObj.monthIndex].photos.splice(tempObj.dateIndex, 1);
                    }

                    if (tempPhotoList[tempObj.monthIndex].photos.length === 0) {
                        tempPhotoList = tempPhotoList.filter((monthImg) => monthImg.photos.length > 0);
                    }
                }
                setPhotoList(tempPhotoList);
                setTickBtnPlace([]);
                setTickBtnValue(0);
                setSingleTickBtn([]);
                setModalDeleteOpen(false);
                toast.success("Images deleted successfully")
            }
        }
        catch (e) {
            toast.error("Something went wrong please try again")
        }
    }

    const hanldeCameraTickClick = () => {
        if (tickBtnValue === 1) return { backgroundColor: '#d3d3d37a', zIndex: '25' }
    }

    return (
        <ImageList.Provider value={{ photosList, setPhotoList, setModalOpen, setModalDeleteOpen, modalDeleteOpen }}>
            <TickBtn.Provider value={{ tickBtnValue, setTickBtnValue, tickBtnPlace, setTickBtnPlace, singleTickBtn, setSingleTickBtn }}>
                <div className="App">
                    <div className="dashboard">
                        {modalDeleteOpen && (
                            <div className="deleteContainer">
                                <div className="deleteTitle">
                                    <Button id='crossLogoBtn' onClick={() => { setTickBtnPlace([]); setTickBtnValue(0); setModalDeleteOpen(false); setSingleTickBtn([]) }} startIcon={<ClearIcon style={{ fontSize: '25px' }} />} size="large" ></Button>
                                    <h3> {hanldePhotoSelected(photosList,tickBtnPlace,singleTickBtn)} Photos Selected</h3>
                                </div>

                                <div className="deleteAndDownloadBtn">
                                    <div>
                                        <Button id="downloadBtn" onClick={() => handleDownload()} startIcon={<DownloadIcon style={{ fontSize: '35px' }} />} size="large"></Button>
                                    </div>
                                    <div className="deleteBtn">
                                        <Button onClick={() => handleDelete()} startIcon={<DeleteForeverIcon style={{ fontSize: '35px' }} />} size="large" ></Button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {modalOpen && tickBtnValue === 0 && <CameraModal />}
                        <div className="dashboardPageContainer">
                            <div className="navBarContainer">
                                <div className="galeryTitle">
                                    <img id="logoImg" src={galeryLogo} alt={"Something went wrong"} />
                                    <h3>Gallery</h3>
                                </div>
                                <div className="clickBtn">
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        htmlFor="imageUpload"
                                        startIcon={<DriveFolderUploadRoundedIcon style={{ fontSize: '38px', color: '#0d95c1' }} />}
                                        size="small"
                                        id="imageUploadBtn"
                                        sx={{ backgroundColor: 'transparent', border: 'none', color: 'inherit' }}
                                    >
                                        <input type="file" id="imageUpload" accept="image/*" style={{ display: 'none' }} onChange={(event) => handleFileSelect(event,photosList,setPhotoList)} />
                                    </Button>
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
                                <div className="clickFixedBtn" style={hanldeCameraTickClick()}>
                                    {
                                        tickBtnValue === 1 ? <Button disabled onClick={() => setModalOpen(true)} startIcon={<AddAPhotoIcon id='cameraLogo' />} size="larger" ></Button>
                                            : <Button onClick={() => setModalOpen(true)} startIcon={<AddAPhotoIcon id='cameraLogo' />} size="larger" ></Button>
                                    }
                                </div>
                            </div>
                            <div className="footer">
                                <p>Developed by <i>Anuj Garg</i></p>
                            </div>
                        </div>
                    </div>
                </div>
            </TickBtn.Provider>
        </ImageList.Provider >
    )
};

export default Dashboard;