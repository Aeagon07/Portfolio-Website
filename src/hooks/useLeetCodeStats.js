import { useState, useEffect } from 'react';
import { leetcodeStats } from '../data/portfolio';

/**
 * Fetches live LeetCode stats for a given username.
 * Falls back to the static data in portfolio.js if the API is unreachable.
 *
 * API: https://alfa-leetcode-api.onrender.com  (free, no key required)
 */
export function useLeetCodeStats(username) {
  const [stats, setStats] = useState(leetcodeStats);   // start with static fallback
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchStats() {
      try {
        setLoading(true);
        setError(null);

        // Fetch solved count + rank in parallel
        const [solvedRes, userRes] = await Promise.all([
          fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`, { signal: AbortSignal.timeout(8000) }),
          fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, { signal: AbortSignal.timeout(8000) }),
        ]);

        if (!solvedRes.ok || !userRes.ok) throw new Error('API error');

        const solvedData = await solvedRes.json();
        const userData  = await userRes.json();

        if (cancelled) return;

        // Map API shape → component shape
        const easeSolved   = solvedData.easySolved   ?? 0;
        const mediumSolved = solvedData.mediumSolved  ?? 0;
        const hardSolved   = solvedData.hardSolved    ?? 0;
        const totalSolved  = solvedData.solvedProblem ?? (easeSolved + mediumSolved + hardSolved);

        const totalEasy   = solvedData.totalEasy   ?? leetcodeStats.categories[0].total;
        const totalMedium = solvedData.totalMedium ?? leetcodeStats.categories[1].total;
        const totalHard   = solvedData.totalHard   ?? leetcodeStats.categories[2].total;
        const totalAll    = totalEasy + totalMedium + totalHard;

        setStats({
          totalSolved,
          totalQuestions: totalAll,
          rank:       userData.ranking ?? leetcodeStats.rank,
          badges:     userData.badges?.length ?? leetcodeStats.badges,
          reputation: userData.reputation ?? leetcodeStats.reputation,
          categories: [
            {
              name: 'Easy',
              solved: easeSolved,
              total:  totalEasy,
              beats:  solvedData.easySolved
                ? Math.round((easeSolved / totalEasy) * 100)
                : leetcodeStats.categories[0].beats,
              color: leetcodeStats.categories[0].color,
            },
            {
              name: 'Medium',
              solved: mediumSolved,
              total:  totalMedium,
              beats:  solvedData.mediumSolved
                ? Math.round((mediumSolved / totalMedium) * 100)
                : leetcodeStats.categories[1].beats,
              color: leetcodeStats.categories[1].color,
            },
            {
              name: 'Hard',
              solved: hardSolved,
              total:  totalHard,
              beats:  solvedData.hardSolved
                ? Math.round((hardSolved / totalHard) * 100)
                : leetcodeStats.categories[2].beats,
              color: leetcodeStats.categories[2].color,
            },
          ],
        });
      } catch (err) {
        if (cancelled) return;
        console.warn('[LeetCode] Live fetch failed, using static data.', err.message);
        setError(err.message);
        // keep the static fallback already in state — no change needed
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchStats();
    return () => { cancelled = true; };
  }, [username]);

  return { stats, loading, error };
}
