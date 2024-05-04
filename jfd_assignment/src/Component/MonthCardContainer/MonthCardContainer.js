import "./monthCardContainer.css"
import DateCardContainer from '../DateCardContainer/DateCardContainer';

const ImageCardContainer = ({ param, monthIndex }) => {

    return (
        <div className='monthWiseImageContainer'>
            <div className='monthShowContainer'>
                <span id="monthSpan">{param.month}</span>
            </div>
            <div className='cardShowContiner'>
                {param.photos.map((photo, index) => (
                    <DateCardContainer param={photo} dateIndex={index} monthIndex={monthIndex} key={photo.date} />  //
                ))}
            </div>
        </div>
    )
};

export default ImageCardContainer;
