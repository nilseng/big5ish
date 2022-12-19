import { StepBar } from "./StepBar";

export const DomainPresentation = () => {
  return (
    <>
      <StepBar currentStep={1} stepCount={5} />
      <div className="flex flex-col items-center my-32">
        <p>Next up...</p>
        <h1 className="text-5xl mt-16 mb-32">Neuroticism</h1>
        <code className="text-4xl">😡😬😱</code>
      </div>
    </>
  );
};
