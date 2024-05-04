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
import moment from 'moment';
import DownloadIcon from '@mui/icons-material/Download';
import DriveFolderUploadRoundedIcon from '@mui/icons-material/DriveFolderUploadRounded';

const Dashboard = () => {

    const [photosList, setPhotoList] = useState([...images]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [tickBtnValue, setTickBtnValue] = useState(0);
    const [tickBtnPlace, setTickBtnPlace] = useState([]);
    const [singleTickBtn, setSingleTickBtn] = useState([]);

    //download photos start --------------------------------------------
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

    // Function to save photo to file system
    const savePhotoToFileSystem = async (directoryHandle, photo) => {
        const blob = dataURItoBlob(photo.src);
        const type = photo.src.split(';')[0].split('/')[1];
        await directoryHandle.getFileHandle(`${photo.name}` + `.${type}`, { create: true }).then((fileHandle) => {
            fileHandle.createWritable().then((fileWritable) => {
                fileWritable.write(blob);
                fileWritable.close();
            });
        });
    };

    // Function to convert data URI to Blob
    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };
    //download photos end -------------------------------------


    //file upload start------------------------------
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

    const handleFileSelect = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            if (!file.type.match('image/.*')) {
                toast.error("Please select an image file (JPG, PNG, etc.)");
                return;
            }
            handleImageChange(file);
        }
    };

    const handleImageChange = (file) => {
        try {
            const dateTime = currentDateTime();
            const date = moment();
            const monthYear = date.format('MMMM YYYY');

            if (photosList.length > 0 && photosList[0].month === monthYear) {
                if (photosList[0].photos[0].date === date.format('DD MMMM')) {
                    const newPhotoList = [...photosList];
                    newPhotoList[0].photos[0].images.push({ time: dateTime, src: URL.createObjectURL(file), aspectRatio: 1 });
                    setPhotoList(newPhotoList);
                }
                else {
                    const newPhotoList = [...photosList];
                    newPhotoList[0].photos = [{ date: date.format('DD MMMM'), images: [{ time: dateTime, src: URL.createObjectURL(file), aspectRatio: 1 }] }, ...newPhotoList[0].photos]
                    setPhotoList(newPhotoList);
                }
            }
            else {
                let newObj = {
                    month: monthYear,
                    photos: [{ date: date.format('DD MMMM'), images: [{ time: dateTime, src: URL.createObjectURL(file), aspectRatio: 1 }] }]
                };
                setPhotoList([newObj, ...photosList]);
            }
            toast.success("Image upload successfully!")
        }
        catch (e) {
            toast.error("Something went wrong please try after sometime!");
            console.log(e);
        }
    };
    //file upload end -----------------------

    function objectExistsInArray(array, date) {
        if (Array.isArray(array)) {
            let newVal = {};
            for (let i in array) {
                if (array[i].date === date) {
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

    const findMonthDatePhotos = (array, monthStr, dateStr) => {
        let obj = {};
        for (let i in array) {
            if (array[i].month === monthStr) {
                obj['monthIndex'] = i;
                obj['dateVal'] = objectExistsInArray(array[i].photos, dateStr);
                break;
            }
        }
        return obj;
    }

    const hanldleSingleImageSearch = (array, monthStr, dateStr, index) => {
        let obj = {};
        for (let i in array) {
            if (array[i].month === monthStr) {
                for (let j in array[i].photos) {
                    if (array[i].photos[j].date === dateStr) {
                        for (let k in array[i].photos[j].images) {
                            if (array[i].photos[j].images[k].time === index) {
                                obj['monthIndex'] = i;
                                obj['dateIndex'] = j;
                                obj['photoIndex'] = k;
                                break;
                            }
                        }
                    }
                }
            }
        }
        return obj;
    }

    const hanldePhotoSelected = () => {
        if (tickBtnPlace.length === 0) return 0;
        let total = singleTickBtn.length > 0 ? singleTickBtn.length : 0;
        for (let obj of tickBtnPlace) {
            total += findMonthDatePhotos(photosList, obj.month, obj.date).dateVal.TotImages;
        }
        return total;
    }

    const handleDelete = () => {
        try {
            // eslint-disable-next-line no-restricted-globals
            let result = confirm(`Are you sure you want to delete all ${hanldePhotoSelected()} photos!`);
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
                                    <h3> {hanldePhotoSelected()} Photos Selected</h3>
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
                                        <input type="file" id="imageUpload" accept="image/*" style={{ display: 'none' }} onChange={handleFileSelect} />
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