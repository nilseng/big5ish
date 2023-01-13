import { DomainId, Step } from "@big5ish/types";
import { useEffect, useState } from "react";
import { isDomainPresentationStep } from "../utils/typeGuards";

const domainEmojisMap: { [key in DomainId]: string } = {
  A: "🤝😇🧎‍♀️",
  C: "🧹🤫🫡",
  E: "🤗😃🗣️",
  N: "😡😬😱",
  O: "🤔🎨🕵️",
};

export const useEmojis = (step?: Step) => {
  const [emojis, setEmojis] = useState<string>();

  useEffect(() => {
    if (isDomainPresentationStep(step)) setEmojis(domainEmojisMap[step.domain.domain]);
  }, [step]);

  return emojis;
};
