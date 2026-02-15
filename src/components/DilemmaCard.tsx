import { useState } from 'react';
import type { Dilemma } from '../data/dilemmas';
import './DilemmaCard.css';

interface Props {
  dilemma: Dilemma;
  userVote: 'A' | 'B' | null;
  onVote: (id: number, choice: 'A' | 'B') => void;
  index: number;
  total: number;
}

export function DilemmaCard({ dilemma, userVote, onVote, index, total }: Props) {
  const [animating, setAnimating] = useState(false);
  const [chosen, setChosen] = useState<'A' | 'B' | null>(userVote);
  const revealed = chosen !== null;
  const pA = dilemma.percentA;
  const pB = 100 - pA;

  const handleChoice = (choice: 'A' | 'B') => {
    if (revealed) return;
    setChosen(choice);
    setAnimating(true);
    onVote(dilemma.id, choice);
    setTimeout(() => setAnimating(false), 600);
  };

  const share = () => {
    const text = `Would you rather...\n\nA: ${dilemma.optionA}\nB: ${dilemma.optionB}\n\nPlay: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className={`dilemma-card ${animating ? 'animating' : ''} ${revealed ? 'revealed' : ''}`}>
      <div className="card-header">
        <span className="card-number">#{index + 1} of {total}</span>
        <span className="card-category">{dilemma.category}</span>
      </div>

      <h2 className="wyr-title">Would You Rather...</h2>

      <div className="choices">
        <button
          className={`choice choice-a ${revealed ? (chosen === 'A' ? 'chosen' : 'not-chosen') : ''}`}
          onClick={() => handleChoice('A')}
          disabled={revealed}
        >
          <span className="choice-label">A</span>
          <span className="choice-text">{dilemma.optionA}</span>
          {revealed && (
            <div className="result">
              <div className="result-bar" style={{ width: `${pA}%` }} />
              <span className="result-pct">{pA}%</span>
            </div>
          )}
        </button>

        <div className="vs-divider">
          <span>OR</span>
        </div>

        <button
          className={`choice choice-b ${revealed ? (chosen === 'B' ? 'chosen' : 'not-chosen') : ''}`}
          onClick={() => handleChoice('B')}
          disabled={revealed}
        >
          <span className="choice-label">B</span>
          <span className="choice-text">{dilemma.optionB}</span>
          {revealed && (
            <div className="result">
              <div className="result-bar" style={{ width: `${pB}%` }} />
              <span className="result-pct">{pB}%</span>
            </div>
          )}
        </button>
      </div>

      {revealed && (
        <button className="share-btn" onClick={share}>
          📤 Share this dilemma
        </button>
      )}
    </div>
  );
}
