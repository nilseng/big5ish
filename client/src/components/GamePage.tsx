import { DomainPresentation } from "./DomainPresentation";

export const GamePage = () => {
  return (
    <DomainPresentation
      currentStep={0}
      stepCount={5}
      domain={{ domain: "N", title: "Neuroticism", emojis: "😡😬😱" }}
    />
  );
};
