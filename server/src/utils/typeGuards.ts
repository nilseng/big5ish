/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimeBoundStep } from "@big5ish/types";

export const isTimeBoundStep = (step?: any): step is TimeBoundStep => {
  return !!step?.duration;
};
