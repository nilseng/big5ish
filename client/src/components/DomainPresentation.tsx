import { Domain } from "@big5ish/types";
import { StepBar } from "./StepBar";

export const DomainPresentation = ({
  currentStep,
  stepCount,
  domain,
}: {
  currentStep: number;
  stepCount: number;
  domain: Pick<Domain, "domain" | "title" | "emojis">;
}) => {
  return (
    <>
      <StepBar currentStep={currentStep} stepCount={stepCount} />
      <div className="flex flex-col items-center my-32">
        <p>Next up...</p>
        <h1 className="text-5xl mt-16 mb-32">{domain.title}</h1>
        <code className="text-4xl">{domain.emojis}</code>
      </div>
    </>
  );
};
