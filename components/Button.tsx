import React from "react";

interface IProps {
  text: string;
  handleClick?: () => void;
}

const Button = ({ text, handleClick }: IProps) => {
  return (
    <button
      onClick={handleClick}
      className="text-uppercase whitespace-nowrap border border-blue-500 bg-transparent
       px-4 py-2 font-semibold text-white"
    >
      {text}
    </button>
  );
};

export default Button;
