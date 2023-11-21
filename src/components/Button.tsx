// components/SaveButton.jsx
import React from "react";

interface IButtonProps {
  text: string;
  handleClick: () => void;
  className: string;
}
const Button = ({ text, handleClick, className }: IButtonProps) => (
  <button className={className} onClick={handleClick}>
    {text}
  </button>
);

export default Button;
