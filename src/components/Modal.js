import React from 'react';
import "./Modal.css";

const Modal = ({reason, closeModal}) => {
    return (
        <div className="background">
            <h3>{reason}</h3>
                <button onClick={closeModal}>Ok</button>
        </div>
    );
};

export default Modal;