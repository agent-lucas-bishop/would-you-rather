import { useState, useCallback, useEffect, useMemo } from 'react';
import { dilemmas, type Category } from './data/dilemmas';
import { DilemmaCard } from './components/DilemmaCard';
import { CategoryFilter } from './components/CategoryFilter';
import { ProgressBar } from './components/ProgressBar';
import { useVoting } from './hooks/useVoting';
import { useSwipe } from './hooks/useSwipe';
import './App.css';

function App() {
  const { vote, hasVoted, answeredCount } = useVoting();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const filtered = useMemo(
    () => activeCategory ? dilemmas.filter(d => d.category === activeCategory) : dilemmas,
    [activeCategory]
  );

  const goNext = useCallback(() => {
    setCurrentIndex(i => Math.min(i + 1, filtered.length - 1));
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex(i => Math.max(i - 1, 0));
  }, []);

  // Reset index when filter changes
  useEffect(() => { setCurrentIndex(0); }, [activeCategory]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  const swipeHandlers = useSwipe(goNext, goPrev);

  const current = filtered[currentIndex];

  return (
    <div className="app" {...swipeHandlers}>
      <header className="app-header">
        <h1 className="logo">
          <span className="logo-wyr">WYR</span>
          <span className="logo-sub">Impossible Edition</span>
        </h1>
      </header>

      <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      <ProgressBar answered={answeredCount} total={dilemmas.length} />

      <main className="main">
        {current ? (
          <DilemmaCard
            key={current.id}
            dilemma={current}
            userVote={hasVoted(current.id)}
            onVote={vote}
            index={currentIndex}
            total={filtered.length}
          />
        ) : (
          <div className="empty">No dilemmas in this category</div>
        )}
      </main>

      <footer className="app-footer">
        <button className="nav-btn" onClick={goPrev} disabled={currentIndex === 0}>
          ← Prev
        </button>
        <span className="nav-hint">Swipe or arrow keys</span>
        <button className="nav-btn" onClick={goNext} disabled={currentIndex >= filtered.length - 1}>
          Next →
        </button>
      </footer>
    </div>
  );
}

export default App;
