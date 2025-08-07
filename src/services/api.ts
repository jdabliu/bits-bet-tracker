// Configuração da API para comunicação com o backend Flask
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Interface para uma partida individual
export interface Match {
  id: string;
  starts: string;
  league: string;
  sport: string;
  home: string;
  away: string;
  hdp?: number;
  points?: number;
  totalupdatedat?: string;
  spreadupdatedat?: string;
  moneylineupdatedat?: string;
  maxspread?: number;
  maxmoneyline?: number;
  maxtotal?: number;
  odds_count?: number;
  last_odds_update?: string;
  // Campos adicionais esperados pelo frontend
  homeOdd?: string;
  drawOdd?: string;
  awayOdd?: string;
  date?: string;
  time?: string;
  homeTeam?: string;
  awayTeam?: string;
}

// Interface para opções de handicap
export interface HandicapOption {
  handicap: string;
  homeOdd: string;
  awayOdd: string;
}

// Interface para opções de over/under
export interface OverUnderOption {
  line: string;
  overOdd: string;
  underOdd: string;
}

// Interface para detalhes completos de uma partida
export interface MatchDetails extends Match {
  handicapOptions?: HandicapOption[];
  overUnderOptions?: OverUnderOption[];
}

// Interface para a resposta da API /matches
export interface MatchResponse {
  matches: Match[];
  total: number;
}

// Parâmetros para buscar partidas
export interface GetMatchesParams {
  sport?: string;
  league?: string;
  status?: 'pending' | 'finished';
  limit?: number;
}

class ApiService {
  private async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  // Função para transformar dados do backend para o formato esperado pelo frontend
  private transformMatchData(match: Match): Match {
    return {
      ...match,
      // Mapear campos do backend para o formato esperado pelo frontend
      homeTeam: match.home,
      awayTeam: match.away,
      date: match.starts ? new Date(match.starts).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : '',
      time: match.starts ? new Date(match.starts).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }) : '',
      // Valores padrão para odds (serão substituídos quando disponíveis)
      homeOdd: match.homeOdd || '2.00',
      drawOdd: match.drawOdd || '3.20',
      awayOdd: match.awayOdd || '2.80',
    };
  }

  // Buscar todas as partidas com filtros opcionais
  async getMatches(params: GetMatchesParams = {}): Promise<MatchResponse> {
    const queryParams = new URLSearchParams();
    
    if (params.sport) queryParams.append('sport', params.sport);
    if (params.league) queryParams.append('league', params.league);
    if (params.status) queryParams.append('status', params.status);
    if (params.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = `/matches${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.fetchApi<MatchResponse>(endpoint);
    
    // Transformar os dados para o formato esperado pelo frontend
    const transformedMatches = response.matches.map(match => this.transformMatchData(match));
    
    return {
      matches: transformedMatches,
      total: response.total
    };
  }

  // Buscar partidas por termo de pesquisa (usando o parâmetro league)
  async searchMatches(query: string): Promise<Match[]> {
    const response = await this.getMatches({ 
      league: query,
      limit: 50 
    });
    return response.matches;
  }

  // Buscar detalhes de uma partida específica
  async getMatchDetails(matchId: string): Promise<MatchDetails> {
    const match = await this.fetchApi<Match>(`/matches/${matchId}`);
    const transformedMatch = this.transformMatchData(match);
    
    // Adicionar opções padrão de handicap e over/under se não estiverem disponíveis
    const matchDetails: MatchDetails = {
      ...transformedMatch,
      handicapOptions: (match as MatchDetails).handicapOptions || [
        { handicap: "+0.50", homeOdd: "1.35", awayOdd: "3.09" },
        { handicap: "+0.25", homeOdd: "1.43", awayOdd: "2.72" },
        { handicap: "+0.00", homeOdd: "1.58", awayOdd: "2.36" },
        { handicap: "-0.25", homeOdd: "1.86", awayOdd: "1.95" },
        { handicap: "-0.50", homeOdd: "2.12", awayOdd: "1.71" },
        { handicap: "-0.75", homeOdd: "2.44", awayOdd: "1.53" }
      ],
      overUnderOptions: (match as MatchDetails).overUnderOptions || [
        { line: "2.00", overOdd: "1.33", underOdd: "3.15" },
        { line: "2.25", overOdd: "1.53", underOdd: "2.41" },
        { line: "2.50", overOdd: "1.74", underOdd: "2.06" },
        { line: "2.75", overOdd: "1.94", underOdd: "1.86" },
        { line: "3.00", overOdd: "2.24", underOdd: "1.63" },
        { line: "3.25", overOdd: "2.50", underOdd: "1.49" }
      ]
    };
    
    return matchDetails;
  }

  // Registrar uma aposta (opcional)
  async logBet(betData: any): Promise<any> {
    return this.fetchApi('/bets', {
      method: 'POST',
      body: JSON.stringify(betData),
    });
  }
}

export const apiService = new ApiService();