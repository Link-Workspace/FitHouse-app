type Props = {
  value: number;
  size?: number;
  label?: string;
};

export function ProgressRing({ value, size = 84, label }: Props) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="progress-ring" style={{ width: size, height: size }}>
      <svg viewBox="0 0 84 84" aria-hidden="true">
        <circle className="progress-ring__track" cx="42" cy="42" r={radius} />
        <circle
          className="progress-ring__value"
          cx="42"
          cy="42"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="progress-ring__label">
        <strong>{value}%</strong>
        {label && <span>{label}</span>}
      </div>
    </div>
  );
}
