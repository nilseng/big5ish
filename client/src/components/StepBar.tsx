import { faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const StepBar = ({ currentStep, stepCount }: { currentStep: number; stepCount: number }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="relative w-9/12">
        <div className="absolute top-2.5 w-full px-3">
          <div className="w-full h-1 bg-gradient-to-bl from-red-400 to-blue-500 rounded-full"></div>
        </div>
        <div className="absolute top-0 w-full flex justify-between">
          {Array.from(Array(stepCount).keys()).map((_, i) => {
            if (i < currentStep)
              return (
                <span key={i} className="fa-layers text-2xl">
                  <FontAwesomeIcon icon={faCircle} className="fa-stack text-2xl text-white" />
                  <FontAwesomeIcon icon={faCheckCircle} className="fa-stack text-2xl text-emerald-400" />
                </span>
              );
            if (i === currentStep) return <div key={i} className="h-6 w-6 bg-white rounded-full"></div>;
            return <div key={i} className="h-6 w-6 invisible"></div>;
          })}
        </div>
      </div>
    </div>
  );
};
