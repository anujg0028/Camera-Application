import './shimmer.css';
import empltyGallery from '../../assets/Images/emptyGallery.png';

const Shimmer = () => {

    return (
        <div className="ShimmerContainer">
            <div className='showMessage'>
                <div id='imageCont'><img src={empltyGallery} alt='Blank' /></div>
                <p id='message'>No Image</p>
                <p>Opps! You don't have any photos in the gallery</p>
            </div>
        </div>
    );
}

export default Shimmer;