import './ProgressBar.css';

interface Props {
  answered: number;
  total: number;
}

export function ProgressBar({ answered, total }: Props) {
  const pct = Math.round((answered / total) * 100);
  return (
    <div className="progress-bar-wrap">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-text">{answered}/{total} answered</span>
    </div>
  );
}
