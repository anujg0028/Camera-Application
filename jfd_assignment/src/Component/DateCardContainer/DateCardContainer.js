import './dateCardContainer.css'
import ImageCard from '../ImageCard/ImageCard';
import { useState, useContext } from 'react';
import deleteLogo from '../../assets/Images/deleteLogo.svg'
import { toast } from "react-toastify";
import ImageList from '../../Context/ImageListContext.js';


const DateWisePhotoCont = ({ param, dateIndex, monthIndex }) => {

    const { photosList, setPhotoList } = useContext(ImageList);

    const [tickBtn, setTickBtn] = useState(0);

    const handleTickBtn = () => {
        if (tickBtn === 0) setTickBtn(1);
        else if (tickBtn === 1) setTickBtn(0)
        console.log(tickBtn)
    }

    const hanldedeleteBtn = () => {
        if(tickBtn === 1)return {display: 'block'};
        else return {display: 'none'};
    }

    const hanldTickAllBtn = () => {
        if(tickBtn === 1)return {display: 'block', backgroundColor: 'lightblue'};
    }

    const handleDeleteAll = () => {
        try {
            // eslint-disable-next-line no-restricted-globals
            let result = confirm(`Are you sure you want to delete all ${param.images.length} photos!`);
            if(result)
            {
                let tempPhotoList = [...photosList];

                tempPhotoList[monthIndex].photos.splice(dateIndex,1);
    
                if (tempPhotoList[monthIndex].photos.length === 0) {
                    tempPhotoList=tempPhotoList.filter((monthImg)=>monthImg.photos.length>0);
                }

                setPhotoList(tempPhotoList);
                toast.success("Images deleted successfully")
            }
        }
        catch (e) {
            toast.error("Something went wrong please try again")
        }
    }

    return (
        <div className='dateWiseImageContainer'>
            <div id='dateShowContainer'>
                <div className='dateAndTick'>
                    <div id='tickBtn' style={hanldTickAllBtn()} onClick={handleTickBtn}>
                        <span>✔</span>
                    </div>
                    <span id='dateSpan'>{param.date}</span>
                </div>
                <div id="deleteAllBtn" style={hanldedeleteBtn()} onClick={handleDeleteAll}>
                    <img src={deleteLogo} alt="No" />
                </div>
            </div>
            <div className='dateWisePhoto'>
                {param.images.map((photo, index) => (
                    <ImageCard param={photo} index={index} monthIndex={monthIndex} dateIndex={dateIndex} key={photo.time} tickBtn={tickBtn} />
                ))}
            </div>
        </div>
    )
}

export default DateWisePhotoCont;