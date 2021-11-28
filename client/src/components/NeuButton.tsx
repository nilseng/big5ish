import { useState } from "react";

interface IProps {
  text: string;
  height: string;
  width: string;
  handleClick?: () => void;
}

const buttonClasses = "flex justify-center items-center text-gray-500 text-3xl cursor-pointer p-10 select-none ";

export const NeuButton = ({ text, height, width, handleClick }: IProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleButtonDown = (e: Event) => {
    setIsPressed(true);
  };

  const handleButtonUp = (e: Event) => {
    setIsPressed(false);
  };

  return (
    <button
      className={isPressed ? buttonClasses + "button-pressed-neumorphic" : buttonClasses + "button-neumorphic"}
      style={{ height, width }}
      onMouseDown={(e: any) => handleButtonDown(e)}
      onMouseUp={(e: any) => handleButtonUp(e)}
      onMouseLeave={(e: any) => handleButtonUp(e)}
      onTouchStart={(e: any) => handleButtonDown(e)}
      onTouchEnd={(e: any) => handleButtonUp(e)}
      onTouchCancel={(e: any) => handleButtonUp(e)}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
