const r = 50;
const d = 2 * r;
const delta = 0.01;
const padding = 10;

export const CircleVisual = ({ value, max }: { value?: number; max: number }) => {
  if (!value && value !== 0) return null;
  return (
    <div className="relative h-full w-full flex justify-center items-center">
      <p className="font-bold text-xs">{value}</p>
      <svg
        className="h-full w-full absolute top-0"
        viewBox={`${-padding} ${-padding} ${d + 2 * padding} ${d + 2 * padding}`}
      >
        <path
          fill="none"
          stroke="white"
          strokeOpacity={"80%"}
          strokeWidth={16}
          strokeLinecap="round"
          d={`
                M${r} 0
                A${r} ${r} 0 ${value > max / 2 ? 1 : 0} 1 ${
            r * (1 + Math.sin(((value - delta) / max) * 2 * Math.PI))
          } ${r * (1 - Math.cos(((value - delta) / max) * 2 * Math.PI))}
            `}
        />
      </svg>
    </div>
  );
};
