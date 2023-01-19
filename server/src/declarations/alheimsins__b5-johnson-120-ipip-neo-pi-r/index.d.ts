declare module "@alheimsins/b5-johnson-120-ipip-neo-pi-r" {
  export function getQuestions(lang = "en"): Question[];
  export function getItems(lang = "en", shuffle = false): Item[];

  export interface Question {
    id: string;
    text: string;
    keyed: "plus" | "minus";
    domain: DomainId;
    facet: number;
  }

  export interface Item extends Question {
    num: number;
    choices: Choice[];
  }

  export interface Choice {
    text: string;
    score: number;
    color: number;
  }

  export type DomainId = "A" | "C" | "E" | "N" | "O";
}
