import React from 'react';
import './InputField.styles.scss';
const InputField = ({ value, handleInput, placeHolder }) => {
  return (
    <input
      type="text"
      value={value}
      className="todo-input"
      onChange={handleInput}
      placeholder={placeHolder}
    />
  );
};
export default InputField;
