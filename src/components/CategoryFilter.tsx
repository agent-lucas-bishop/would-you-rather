import { categories, type Category } from '../data/dilemmas';
import './CategoryFilter.css';

interface Props {
  active: Category | null;
  onChange: (cat: Category | null) => void;
}

export function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="category-filter">
      <button
        className={`cat-btn ${active === null ? 'active' : ''}`}
        onClick={() => onChange(null)}
      >
        🎲 All
      </button>
      {categories.map(c => (
        <button
          key={c.key}
          className={`cat-btn ${active === c.key ? 'active' : ''}`}
          onClick={() => onChange(active === c.key ? null : c.key)}
        >
          {c.emoji} {c.label}
        </button>
      ))}
    </div>
  );
}
