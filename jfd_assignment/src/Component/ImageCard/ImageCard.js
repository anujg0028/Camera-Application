import "./imageCard.css"
import React, { useContext } from 'react'
import { toast } from "react-toastify";
import deleteLogo from '../../assets/Images/deleteLogo.jpeg'
import ImageList from '../../Context/ImageListContext.js';

const ImageCard = ({ param, index }) => {
    
    const { photosList, setPhotoList } = useContext(ImageList);

    const handleDeleteCard = async (id) => {
        try{
            let tempPhotoList = [...photosList]; 
            tempPhotoList.splice(index, 1);
            setPhotoList(tempPhotoList);
            toast.success("Image deleted successfully")
        }
        catch(e){
            toast.error("Something went wrong please try again")
        }
    }
    
    return (
        <div className="imageCardContainer">
            <div className="imageShowContainer">
                <img src={param.src} alt={"Something went wrong"} />
            </div>
            <div className="timeAndDelete">
                <p id="date">{param.time}</p>
                <button onClick={() => handleDeleteCard()}><img className="deleteBtn" src={deleteLogo} alt="x"></img></button>
            </div>
        </div>
    )
};

export default ImageCard;