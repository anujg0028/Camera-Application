import "./imageCard.css"
import React, { useContext } from 'react'
import { toast } from "react-toastify";
import deleteLogo from '../../assets/Images/deleteLogo.svg'
import ImageList from '../../Context/ImageListContext.js';
import TickBtn from '../../Context/TickBtn';

const ImageCard = ({ param, index, monthIndex, dateIndex, objectExistsInArray }) => {

    const { photosList, setPhotoList } = useContext(ImageList);
    const { tickBtnValue, tickBtnPlace, singleTickBtn, setSingleTickBtn, setTickBtnPlace } = useContext(TickBtn);

    const handleDeleteCard = () => {
        try {
            // eslint-disable-next-line no-restricted-globals
            let result = confirm("Are you sure you want to delete a photo!");
            if (result) {
                let tempPhotoList = [...photosList];

                tempPhotoList[monthIndex].photos[dateIndex].images.splice(index, 1);

                if (tempPhotoList[monthIndex].photos[dateIndex].images.length === 0) {
                    tempPhotoList[monthIndex].photos.splice(dateIndex, 1);
                }

                if (tempPhotoList[monthIndex].photos.length === 0) {
                    tempPhotoList = tempPhotoList.filter((monthImg) => monthImg.photos.length > 0);
                }

                setPhotoList(tempPhotoList);
                toast.success("Image deleted successfully")
            }
        }
        catch (e) {
            toast.error("Something went wrong please try again")
        }
    }

    const hangleMatchingDateFinder = (action) => {
        if (action === 'addedNewTick') {
            let dateImagesSelected = singleTickBtn.filter((obj) => obj.month === photosList[monthIndex].month && obj.date === photosList[monthIndex].photos[dateIndex].date);
            if (dateImagesSelected.length === photosList[monthIndex].photos[dateIndex].images.length - 1) return true;
            else return false;
        }
        else {
            let dateImagesSelected = singleTickBtn.filter((obj) => obj.month === photosList[monthIndex].month && obj.date === photosList[monthIndex].photos[dateIndex].date && obj.index === photosList[monthIndex].photos[dateIndex].images[index].time);
            if (dateImagesSelected.length > 0) return true;
            else return false;
        }
    }

    const handleSingleTickBtn = () => {

        if (singleTickBtn.length === 0) {
            if (photosList[monthIndex].photos[dateIndex].images.length === 1) {
                setTickBtnPlace([...tickBtnPlace,{ month: photosList[monthIndex].month, date: photosList[monthIndex].photos[dateIndex].date }]);
            }
            else setSingleTickBtn([{ month: photosList[monthIndex].month, date: photosList[monthIndex].photos[dateIndex].date, index: photosList[monthIndex].photos[dateIndex].images[index].time }])
        }
        else if (hangleMatchingDateFinder()) {
            let newValue = singleTickBtn.filter((obj) => obj.month !== photosList[monthIndex].month && obj.date !== photosList[monthIndex].photos[dateIndex].date && obj.index !== photosList[monthIndex].photos[dateIndex].images[index].time);
            if (newValue.length === 0) {
                setSingleTickBtn([]);
            }
            else {
                setSingleTickBtn(newValue);
            }
        }
        else {
            if (hangleMatchingDateFinder('addedNewTick')) {
                let dateImagesSelected = singleTickBtn.filter((obj) => obj.month !== photosList[monthIndex].month && obj.date !== photosList[monthIndex].photos[dateIndex].date);
                setSingleTickBtn(dateImagesSelected);
                setTickBtnPlace([...tickBtnPlace, { month: photosList[monthIndex].month, date: photosList[monthIndex].photos[dateIndex].date }]);
            }
            else {
                setSingleTickBtn([...singleTickBtn, { month: photosList[monthIndex].month, date: photosList[monthIndex].photos[dateIndex].date, index: photosList[monthIndex].photos[dateIndex].images[index].time }])
            }
        }
    }

    const handleSelectAll = () => {
        if (tickBtnValue === 1 && objectExistsInArray(tickBtnPlace, { month: photosList[monthIndex].month, date: photosList[monthIndex].photos[dateIndex].date })) return { border: '10px solid lightblue', padding: '5px', transform: 'scale(1)' };
        else if (hangleMatchingDateFinder()) return { border: '10px solid lightblue', padding: '5px', transform: 'scale(1)' };
    }

    const handleDeleteBtn = () => {
        if (tickBtnValue === 1 && objectExistsInArray(tickBtnPlace, { month: photosList[monthIndex].month, date: photosList[monthIndex].photos[dateIndex].date })) return { display: 'none' };
    }

    const hanldSingleTickStyle = () => {
        if (hangleMatchingDateFinder()) return { backgroundColor: 'lightblue' };
        else if (tickBtnValue === 1 && objectExistsInArray(tickBtnPlace, { month: photosList[monthIndex].month, date: photosList[monthIndex].photos[dateIndex].date })) return { display: 'none' }
    }

    const hanldeSpanTick = () => {
        if (hangleMatchingDateFinder()) return { display: 'block' };
        else return { display: 'none' };
    }

    return (
        <div className="imageShowContainer" style={handleSelectAll()}>
            {
                tickBtnValue === 1 ? <div id='singleImageTickBtn' style={hanldSingleTickStyle()} onClick={handleSingleTickBtn}><span style={hanldeSpanTick()}>✔</span></div>
                    : <div id="deleteBtn" style={handleDeleteBtn()} onClick={() => handleDeleteCard()}><img src={deleteLogo} alt="No" /></div>
            }
            <img className="photoImg" src={param.src} alt={"Something went wrong"} />
        </div>
    )
};

export default ImageCard;
