import "./modal.css";
import React, { useState, useContext } from "react";
import Camera from '../Camera/Camera.js';
import ImageList from '../../Context/ImageListContext.js';

function CameraModal() {

    const { setModalOpen } = useContext(ImageList);
    const [btnloading, setBtnLoading] = useState(false);

    return (
        <div className="addNewModalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <div className="modal-title">
                        <span>CAPTURE PHOTO</span>
                    </div>
                    <button
                        className="crossButton"
                        onClick={() => {
                            setModalOpen(false);
                        }}
                        disabled={btnloading}
                    >
                        x
                    </button>
                </div>
                <div>
                    <Camera />
                </div>
            </div>
        </div>
    );
}

export default CameraModal;