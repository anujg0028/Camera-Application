import './dateCardContainer.css'
import ImageCard from '../ImageCard/ImageCard';
import { useContext } from 'react';
import ImageList from '../../Context/ImageListContext.js';
import TickBtn from '../../Context/TickBtn.js';
import { handleDateShowing, objectExistsInArray, deleteObjectFromArray } from '../../Utils/dateWiseCompFunc.js';


const DateWisePhotoCont = ({ param, dateIndex, monthIndex }) => {

    const { photosList, setModalDeleteOpen } = useContext(ImageList);
    const { tickBtnValue, setTickBtnValue, tickBtnPlace, setTickBtnPlace, singleTickBtn, setSingleTickBtn } = useContext(TickBtn);

    const handleTickBtn = () => {

        if (tickBtnPlace.length === 0) {
            setModalDeleteOpen(true);
            setTickBtnValue(1);
            setTickBtnPlace([{ month: photosList[monthIndex].month, date: photosList[monthIndex].photos[dateIndex].date }]);
        }
        else if (tickBtnValue === 1 && objectExistsInArray(tickBtnPlace, { month: photosList[monthIndex].month, date: photosList[monthIndex].photos[dateIndex].date })) {
            let newValue = deleteObjectFromArray(tickBtnPlace, { month: photosList[monthIndex].month, date: photosList[monthIndex].photos[dateIndex].date })
            if (newValue.length === 0) {
                setModalDeleteOpen(false);
                setTickBtnValue(0);
                setTickBtnPlace([]);
                setSingleTickBtn([]);
            }
            else {
                setTickBtnPlace(newValue);
            }
        }
        else if (tickBtnValue === 1) {
            let dateImagesSelected = singleTickBtn.filter((obj) => obj.month === photosList[monthIndex].month && obj.date === photosList[monthIndex].photos[dateIndex].date);
            if (dateImagesSelected.length > 0) {
                let newSingleTick = singleTickBtn.filter((obj) => obj.month !== photosList[monthIndex].month && obj.date !== photosList[monthIndex].photos[dateIndex].date);
                setSingleTickBtn(newSingleTick);
            }
            setTickBtnPlace([...tickBtnPlace, { month: photosList[monthIndex].month, date: photosList[monthIndex].photos[dateIndex].date }]);
        }
    }

    const hanldTickAllBtn = () => {
        if (tickBtnValue === 1 && objectExistsInArray(tickBtnPlace, { month: photosList[monthIndex].month, date: photosList[monthIndex].photos[dateIndex].date })) return { display: 'block', backgroundColor: 'lightblue' };
        else if (tickBtnValue === 1) return { display: 'block' }
    }

    return (
        <div className='dateWiseImageContainer'>
            <div id='dateShowContainer'>
                <div className='dateAndTick'>
                    <div id='tickBtn' style={hanldTickAllBtn()} onClick={handleTickBtn}>
                        <span>✔</span>
                    </div>
                    <span id='dateSpan'>{handleDateShowing(param)}</span>
                </div>
            </div>
            <div className='dateWisePhoto'>
                {param.images.map((photo, index) => (
                    <ImageCard param={photo} index={index} monthIndex={monthIndex} dateIndex={dateIndex} key={photo.time} objectExistsInArray={objectExistsInArray} />
                ))}
            </div>
        </div>
    )
}

export default DateWisePhotoCont;
