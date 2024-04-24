import "./imageCard.css"

const ImageCard = ({ param }) => {
    return (
        <div className="imageCardContainer">
            <div className="imageShowContainer">
                <img src={param} alt={"Something went wrong"} />
            </div>
            <div className="timeDeleteContainer">
                <h4>hshsh</h4>
            </div>
        </div>
    )
};

export default ImageCard;