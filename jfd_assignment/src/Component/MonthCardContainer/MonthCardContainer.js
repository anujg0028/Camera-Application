import "./monthCardContainer.css"
import ImageCard from '../ImageCard/ImageCard';
import DateCardContainer from '../DateCardContainer/DateCardContainer';

const ImageCardContainer = ({ param, monthIndex }) => {

    return (
        <div className='monthWiseImageContainer'>
            <div className='monthShowContainer'>
                <span id="monthSpan">{param.month}</span>
            </div>
            <div className='cardShowContiner'>
                {param.photos.map((photo, index) => (
                    <DateCardContainer param={photo} dateIndex={index} monthIndex={monthIndex} key={photo.date} />
                ))}
            </div>
        </div>
    )
};

export default ImageCardContainer;


{/* <div className='monthWiseImageContainer'>
<div className='monthShowContainer'><span id="monthSpan">{param.month}</span></div>
<div className='cardShowContiner'>
    {param.photos.map((photo, index) => (
        <ImageCard param={photo} index={index} monthIndex={monthIndex} key={photo.time} />
    ))}
</div>
</div> */}