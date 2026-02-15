import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'wyr-votes';

type Votes = Record<number, 'A' | 'B'>;

export function useVoting() {
  const [votes, setVotes] = useState<Votes>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
  }, [votes]);

  const vote = useCallback((id: number, choice: 'A' | 'B') => {
    setVotes(prev => ({ ...prev, [id]: choice }));
  }, []);

  const hasVoted = useCallback((id: number) => votes[id] ?? null, [votes]);

  const answeredCount = Object.keys(votes).length;

  const reset = useCallback(() => {
    setVotes({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { vote, hasVoted, answeredCount, reset };
}
