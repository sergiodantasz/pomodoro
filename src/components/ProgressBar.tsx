type ProgressBarProps = {
  value: number;
  max: number;
  reverse?: boolean;
};

export const ProgressBar = ({
  value,
  max,
  reverse = true
}: ProgressBarProps) => {
  const progressValue = reverse ? max - value : value;
  const percentage = max > 0 ? Math.round((progressValue / max) * 100) : 0;
  return (
    <progress
      className="progress w-48"
      value={progressValue}
      max={max}
      aria-label={`Progress: ${percentage}%`}
    />
  );
};
