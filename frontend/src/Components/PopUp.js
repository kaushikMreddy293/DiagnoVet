import React, { useEffect } from 'react';
import '../Styles/PopUp.css'; // Import your errorPopup CSS file

const ErrorPopup = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Automatically close the popup after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clear the timeout on unmount or when the popup is closed manually
  }, [onClose]);

  let className = 'error-popup';

  switch (type) {
    case 'success':
      className += ' success';
      break;
    case 'warning':
      className += ' warning';
      break;
    case 'error':
      className += ' error';
      break;
    default:
      className += ' error'; // Default to error if type is not specified
  }

  return (
    <div className={className}>
      <div className="error-popup-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorPopup;
