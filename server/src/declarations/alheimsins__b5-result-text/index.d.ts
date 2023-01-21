declare module "@alheimsins/b5-result-text" {
  function generateResult(data: { lang: string; scores: any }): {
    domain: string;
    title: string;
    shortDescription: string;
    description: string;
    scoreText: string;
    count: number;
    score: number;
    facets: any;
    text: string;
  }[];

  export default generateResult;

  export function getInfo(): {
    languages: {
      id: string;
      text: string;
    }[];
  };

  export type DomainId = "A" | "C" | "E" | "N" | "O";

  export interface Domain {
    domain: DomainId;
    title: string;
    shortDescription: string;
    description: string;
    results: DomainResult[];
    facets: Facet[];
  }

  export interface DomainResult {
    score: "low" | "high" | "neutral";
    text: string;
  }

  export interface Facet {
    facet: number;
    title: string;
    text: string;
  }

  export function getTemplate(language?: string = "en"): Domain[];

  export function getDomain(options: { domain: string; language: string }): Domain;

  export function getFacet(options: { domain: string; language: string; facet: number }): Facet;
}
