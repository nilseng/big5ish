export const ProgressBar = ({ value, max, className }: { value?: number; max: number; className?: string }) => {
  if (!(value && value !== 0) || !max) return null;
  return (
    <div className={`relative w-full rounded-full ${className ?? "h-2.5"}`}>
      <div className="absolute top-0 bg-gray-200 opacity-10 w-full h-full rounded-full"></div>
      <div className="absolute top-0 bg-white h-full rounded-full" style={{ width: `${(100 * value) / max}%` }}></div>
    </div>
  );
};
