import React from 'react';
import './Styles.css'

const PopupMessage = ({ message, onClose }) => {
    return (
        <div className="popup-message" style={{backgroundColor : 'crimson' }}>
            <div className="popup-content">
                <span>{message.includes('500') || message.includes('404') || message.includes('undefined') ? 'No content found' : message}</span>
                <span onClick={onClose} className='popupClose'></span>
            </div>
        </div>
    );
};

export default PopupMessage;
