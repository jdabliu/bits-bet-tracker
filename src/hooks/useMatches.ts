import { useState, useEffect } from 'react';
import { apiService, Match, GetMatchesParams } from '@/services/api';

export const useMatches = (params: GetMatchesParams = {}) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getMatches(params);
      setMatches(data.matches);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar partidas');
      setMatches([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [JSON.stringify(params)]);

  return {
    matches,
    total,
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

  const clearResults = () => {
    setResults([]);
    setError(null);
  };

  return {
    results,
    loading,
    error,
    searchMatches,
    clearResults,
  };
};