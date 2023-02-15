import { useMemo } from "react";

export const ProgressBar = ({ value, max, className }: { value?: number; max: number; className?: string }) => {
  const { normalizedValue, normalizedMax } = useMemo(
    () => ({ normalizedValue: value ? value - 1 : NaN, normalizedMax: max - 1 }),
    [value, max]
  );
  return (
    <div className={`relative w-full rounded-full ${className ?? "h-2.5"}`}>
      <div className="absolute top-0 bg-gray-200 opacity-10 w-full h-full rounded-full"></div>
      <div
        className="absolute top-0 bg-white h-full rounded-full"
        style={{ width: `${(100 * normalizedValue) / normalizedMax}%` }}
      ></div>
    </div>
  );
};
