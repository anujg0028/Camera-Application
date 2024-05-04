import './dateCardContainer.css'
import ImageCard from '../ImageCard/ImageCard';
import { useContext } from 'react';
import ImageList from '../../Context/ImageListContext.js';
import moment from 'moment';
import TickBtn from '../../Context/TickBtn.js';


const DateWisePhotoCont = ({ param, dateIndex, monthIndex }) => {

    const { photosList, setModalDeleteOpen } = useContext(ImageList);
    const { tickBtnValue, setTickBtnValue, tickBtnPlace, setTickBtnPlace } = useContext(TickBtn);

    const handleDateShowing = () => {
        const date = moment();
        const DateMonth = date.format('DD MMMM');
        const previousDate = moment().subtract(1, 'days').format('DD MMMM');
        if (DateMonth === param.date) return "Today";
        else if (previousDate === param.date) return "Yesterday";
        else return param.date;
    }

    function objectExistsInArray(array, targetObject) {
        if (Array.isArray(array)) {
            return array.some(obj => obj.month === targetObject.month && obj.date === targetObject.date);
        } else {
            console.error("The provided array is not a valid array.");
            return false;
        }
    }

    function deleteObjectFromArray(array, targetObject) {
        return array.filter(obj => obj.month !== targetObject.month || obj.date !== targetObject.date);
    }

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
            }
            else {
                setTickBtnPlace(newValue);
            }
        }
        else if (tickBtnValue === 1) {
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
                    <span id='dateSpan'>{handleDateShowing()}</span>
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
