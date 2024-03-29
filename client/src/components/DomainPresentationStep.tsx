import { Domain } from "@big5ish/types";
import { useContext } from "react";
import { LocaleContext } from "../App";
import translations from "./DomainPresentationStep.translations.json";
import { StepBar } from "./StepBar";

export const DomainPresentationStep = ({
  currentStep,
  stepCount,
  domain,
}: {
  currentStep: number;
  stepCount: number;
  domain: Pick<Domain, "domain" | "title" | "emojis">;
}) => {
  const { locale } = useContext(LocaleContext);

  return (
    <div className="w-full overflow-hidden">
      <StepBar currentStep={currentStep} stepCount={stepCount} />
      <div className="w-full flex flex-col items-center my-32">
        <p>{translations[locale].NextUp}</p>
        <h1 className="w-full text-center text-4xl sm:text-5xl mt-16 mb-32 truncate">{domain.title}</h1>
        <code className="text-4xl">{domain.emojis}</code>
      </div>
    </div>
  );
};
