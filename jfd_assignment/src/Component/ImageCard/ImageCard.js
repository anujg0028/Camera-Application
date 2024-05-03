import "./imageCard.css"
import React, { useContext } from 'react'
import { toast } from "react-toastify";
import deleteLogo from '../../assets/Images/deleteLogo.svg'
import ImageList from '../../Context/ImageListContext.js';

const ImageCard = ({ param, index, monthIndex, dateIndex, tickBtn }) => {

    const { photosList, setPhotoList } = useContext(ImageList);

    const handleDeleteCard = () => {
        try {
            // eslint-disable-next-line no-restricted-globals
            let result = confirm("Are you sure you want to delete a photo!");
            if(result)
            {
                let tempPhotoList = [...photosList];

                tempPhotoList[monthIndex].photos[dateIndex].images.splice(index, 1);
    
                if (tempPhotoList[monthIndex].photos[dateIndex].images.length === 0) {
                    tempPhotoList[monthIndex].photos.splice(dateIndex, 1);
                }
    
                if (tempPhotoList[monthIndex].photos.length === 0) {
                    tempPhotoList=tempPhotoList.filter((monthImg)=>monthImg.photos.length>0);
                }
    
                setPhotoList(tempPhotoList);
                toast.success("Image deleted successfully")
            }
        }
        catch (e) {
            toast.error("Something went wrong please try again")
        }
    }

    const handleSelectAll = () => {
        if(tickBtn === 1)return  {border: '10px solid lightblue', padding: '5px', transform: 'scale(1)'};
    }

    const handleDeleteBtn = () => {
        if(tickBtn === 1)return {display: 'none'};
    }

    return (
        <div className="imageShowContainer" style={handleSelectAll()}>
            <div id="deleteBtn" style={handleDeleteBtn()} onClick={() => handleDeleteCard()}><img src={deleteLogo} alt="No" /></div>
            <img className="photoImg" src={param.src} alt={"Something went wrong"} />
        </div>
    )
};

export default ImageCard;
