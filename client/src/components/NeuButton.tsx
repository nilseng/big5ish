import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, ReactElement, useEffect, useState } from "react";

interface IProps {
  type: "light" | "colored";
  className?: string;
  textClassName?: string;
  text?: string;
  icon?: IconDefinition;
  componentIcon?: ReactElement;
  style?: CSSProperties;
  action?: () => void;
  asyncAction?: () => Promise<void>;
  disabled?: boolean;
}

const defaultButtonClasses = "flex justify-center items-center text-gray-500 select-none ";

export const NeuButton = ({
  type,
  className,
  textClassName,
  text,
  icon,
  componentIcon,
  style,
  action,
  asyncAction,
  disabled = false,
}: IProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonClasses, setButtonClasses] = useState<string>(defaultButtonClasses);

  const handleButtonDown = () => {
    setIsPressed(true);
  };

  const handleButtonUp = () => {
    setIsPressed(false);
  };

  const handleClick = async () => {
    if (action) {
      action();
    }
    if (asyncAction) {
      setIsLoading(true);
      await asyncAction();
      setIsLoading(false);
    }
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
      disabled={disabled}
      onMouseDown={handleButtonDown}
      onMouseUp={handleButtonUp}
      onMouseLeave={handleButtonUp}
      onMouseOut={handleButtonUp}
      onTouchStart={handleButtonDown}
      onTouchEnd={handleButtonUp}
      onTouchCancel={handleButtonUp}
      onClick={handleClick}
    >
      {isLoading ? (
        <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
      ) : (
        <>
          {icon && <FontAwesomeIcon className="w-full h-full text-gray-200" icon={icon} />}
          {componentIcon}
          <span className={textClassName}>{text}</span>
        </>
      )}
    </button>
  );
};
