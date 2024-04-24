import React, { useState } from "react";
import "./modal.css";
import Camera from '../Camera/Camera.js'

function CameraModal({ setModalOpen, photosList, setPhotoList }) {

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
                        X
                    </button>
                </div>
                <div>
                    <Camera photosList={photosList} setPhotoList={setPhotoList} setModalOpen={setModalOpen} />
                </div>
            </div>
        </div>
    );
}

export default CameraModal;