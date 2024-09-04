import React, { useState } from 'react';
import "../../../assets/css/admin/main.css"
const generateCaptcha = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

const DeleteModal = ({ onDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const [captchaValue, setCaptchaValue] = useState('');
    const [captchaError, setCaptchaError] = useState('');
    const [generatedCaptcha, setGeneratedCaptcha] = useState('');

    const handleShowModal = () => {
        setGeneratedCaptcha(generateCaptcha());
        setShowModal(true);
        setCaptchaValue('');
        setCaptchaError('');
    };

    const handleHideModal = () => {
        setShowModal(false);
    };

    const handleDelete = () => {
        if (captchaValue === generatedCaptcha) {
            onDelete();
            handleHideModal();
        } else {
            setCaptchaError('Incorrect CAPTCHA value. Please try again.');
        }
    };

    const handleChange = (e) => {
        setCaptchaValue(e.target.value);
        setCaptchaError('');
    };

    return (
        <>
            <button className="delete-button" onClick={handleShowModal}   style={{
                                fontSize: "1.2rem",
                                backgroundColor: "transparent",
                                border: "none",
                                color: "#FD7238",
                                padding: "0.5rem",
                                cursor: "pointer",
                              }}>
            <i className="fa-solid fa-trash"></i>
            </button>

            {showModal && (
                <div className="delete-popup">
                    <div className="delete-popup-content">
                        <h3>Enter Captcha</h3>
                        <p>If you want to delete, enter  <b>{generatedCaptcha}</b></p>
                        <p className="generated-captcha"></p>
                        <div className="captcha-input">
                            <input
                                type="text"
                                placeholder="Enter Captcha"
                                value={captchaValue}
                                onChange={handleChange}
                            />
                            {captchaError && <p className="captcha-error" style={{ color: "red" }}>{captchaError}</p>}
                        </div>
                        <div className="delete-popup-buttons">
                            <button style={{ backgroundColor: "#DC3545" }} onClick={handleDelete}>Delete</button>
                            <button style={{ backgroundColor: "#3C91E6" }} onClick={handleHideModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteModal;
