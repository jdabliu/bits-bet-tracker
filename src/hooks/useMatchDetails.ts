import { useState, useEffect } from 'react';
import { apiService, MatchDetails } from '@/services/api';

export const useMatchDetails = (matchId: string) => {
  const [matchDetails, setMatchDetails] = useState<MatchDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatchDetails = async () => {
    if (!matchId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getMatchDetails(matchId);
      setMatchDetails(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar detalhes da partida');
      setMatchDetails(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatchDetails();
  }, [matchId]);

  return {
    matchDetails,
    loading,
    error,
    refetch: fetchMatchDetails,
  };
};