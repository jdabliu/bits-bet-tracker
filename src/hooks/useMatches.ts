import { useState, useEffect } from 'react';
import { apiService, Match } from '@/services/api';

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getMatches();
      setMatches(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar partidas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return {
    matches,
    loading,
    error,
    refetch: fetchMatches,
  };
};

export const useMatchSearch = () => {
  const [results, setResults] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMatches = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await apiService.searchMatches(query);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro na pesquisa');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    searchMatches,
  };
};