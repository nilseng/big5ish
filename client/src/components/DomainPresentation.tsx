import { StepBar } from "./StepBar";

export const DomainPresentation = () => {
  return (
    <>
      <StepBar currentStep={0} stepCount={5} />
      <div className="flex flex-col items-center my-32">
        <p>Next up...</p>
        <h1 className="text-5xl font-bold mt-16 mb-32">Neuroticism</h1>
        <code className="text-5xl">😱 😬 😢 🐥 😡 😰</code>
      </div>
    </>
  );
};
