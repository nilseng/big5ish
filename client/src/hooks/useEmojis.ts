import { DomainId, Game } from "@big5ish/types";
import { useEffect, useState } from "react";

const domainEmojisMap: { [key in DomainId]: string } = {
  A: "🤝😇🧎‍♀️",
  C: "🧹🤫🫡",
  E: "🤗😃🗣️",
  N: "😡😬😱",
  O: "🤔🎨🕵️",
};

export const useEmojis = (data?: { game: Game }) => {
  const [emojis, setEmojis] = useState<string>();

  useEffect(() => {
    if (data) setEmojis(domainEmojisMap[data.game.steps[data.game.currentStep].domain.domain]);
  }, [data]);

  return emojis;
};
