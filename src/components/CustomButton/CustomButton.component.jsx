import React from 'react';
import './CustomButton.styles.scss';
const CustomButton = ({ children, handleSubmit }) => {
  return (
    <button className="custom-button" type="submit" onClick={handleSubmit}>
      {children}
    </button>
  );
};
export default CustomButton;
