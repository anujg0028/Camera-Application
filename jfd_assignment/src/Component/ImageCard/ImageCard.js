import "./imageCard.css"

const ImageCard = ({ param }) => {

    console.log(param)

    return (
        <div className="imageCardContainer">
            <div className="imageShowContainer">
                <img src={param} />
            </div>
            <div className="timeDeleteContainer">

            </div>
        </div>
    )
};

export default ImageCard;