import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, ReactElement, useEffect, useState } from "react";

interface IProps {
  type: "light" | "colored";
  className?: string;
  text?: string;
  icon?: IconDefinition;
  componentIcon?: ReactElement;
  style: CSSProperties;
  handleClick?: () => void;
}

const defaultButtonClasses = "flex justify-center items-center text-gray-500 text-3xl cursor-pointer select-none ";

export const NeuButton = ({ type, className, text, icon, componentIcon, style, handleClick }: IProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [buttonClasses, setButtonClasses] = useState<string>(defaultButtonClasses);

  const handleButtonDown = (e: Event) => {
    setIsPressed(true);
  };

  const handleButtonUp = (e: Event) => {
    setIsPressed(false);
  };

  useEffect(() => {
    if (type === "light") {
      setButtonClasses(
        isPressed
          ? defaultButtonClasses + className + " light-pressed-button-shadow"
          : defaultButtonClasses + className + " light-button-shadow"
      );
    }
    if (type === "colored") {
      setButtonClasses(
        isPressed
          ? defaultButtonClasses + className + " colored-pressed-button-shadow"
          : defaultButtonClasses + className + " colored-button-shadow"
      );
    }
  }, [type, className, isPressed]);

  return (
    <button
      className={buttonClasses}
      style={style}
      onMouseDown={(e: any) => handleButtonDown(e)}
      onMouseUp={(e: any) => handleButtonUp(e)}
      onMouseLeave={(e: any) => handleButtonUp(e)}
      onMouseOut={(e: any) => handleButtonUp(e)}
      onTouchStart={(e: any) => handleButtonDown(e)}
      onTouchEnd={(e: any) => handleButtonUp(e)}
      onTouchCancel={(e: any) => handleButtonUp(e)}
      onClick={handleClick}
    >
      {icon && <FontAwesomeIcon className="w-full h-full" icon={icon} />}
      {componentIcon}
      {text}
    </button>
  );
};
