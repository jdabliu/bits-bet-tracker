// Configuração da API para comunicação com o backend Python
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'; // Ajuste para a URL do seu backend

export interface Match {
  id: number;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  homeOdd: string;
  drawOdd: string;
  awayOdd: string;
  status?: string;
}

export interface MatchDetails extends Match {
  handicapOptions?: HandicapOption[];
  overUnderOptions?: OverUnderOption[];
}

export interface HandicapOption {
  handicap: string;
  homeOdd: string;
  awayOdd: string;
}

export interface OverUnderOption {
  line: string;
  overOdd: string;
  underOdd: string;
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

  // Buscar todas as partidas
  async getMatches(): Promise<Match[]> {
    return this.fetchApi<Match[]>('/matches');
  }

  // Buscar partidas por termo de pesquisa
  async searchMatches(query: string): Promise<Match[]> {
    return this.fetchApi<Match[]>(`/matches/search?q=${encodeURIComponent(query)}`);
  }

  // Buscar detalhes de uma partida específica
  async getMatchDetails(matchId: string): Promise<MatchDetails> {
    return this.fetchApi<MatchDetails>(`/matches/${matchId}`);
  }

  // Registrar uma aposta (se necessário)
  async logBet(betData: any): Promise<any> {
    return this.fetchApi('/bets', {
      method: 'POST',
      body: JSON.stringify(betData),
    });
  }
}

export const apiService = new ApiService();