import { faClone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CopyButton = ({ text, className }: { text: string; className?: string }) => {
  return (
    <FontAwesomeIcon
      className={`cursor-pointer ${className}`}
      icon={faClone}
      onClick={() => navigator.clipboard.writeText(text)}
    />
  );
};
