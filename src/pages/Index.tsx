import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMatchSearch } from "@/hooks/useMatches";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import LogBetModal from "@/components/LogBetModal";
import MatchDetailsModal from "@/components/MatchDetailsModal";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { results: searchResults, loading: searchLoading, searchMatches, clearResults } = useMatchSearch();
  const [showBetModal, setShowBetModal] = useState(false);
  const [showMatchDetailsModal, setShowMatchDetailsModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState("");
  const [selectedBet, setSelectedBet] = useState("");
  const [prefilledOdds, setPrefilledOdds] = useState("");
  const [prefilledBetType, setPrefilledBetType] = useState("");
  const [prefilledOption, setPrefilledOption] = useState("");
  const [selectedMatchDetails, setSelectedMatchDetails] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleBetClick = (match: string, betType: string, odd: string) => {
    setSelectedMatch(match);
    setSelectedBet(`${betType} - ${odd}`);
    setShowBetModal(true);
  };

  const handleMatchClick = (match: any) => {
    setSelectedMatchDetails(match);
    setShowMatchDetailsModal(true);
  };

  const handleBetFromDetailsModal = (betType: string, odd: string, marketType?: string, marketOption?: string) => {
    if (selectedMatchDetails) {
      setSelectedMatch(`${selectedMatchDetails.homeTeam} x ${selectedMatchDetails.awayTeam}`);
      setSelectedBet(`${betType} - ${odd}`);
      
      // For moneyline bets, prefill the odds, for other markets, don't prefill odds
      if (marketType === "Moneyline") {
        setPrefilledOdds(odd);
        setPrefilledBetType("Moneyline");
        setPrefilledOption(marketOption || "");
      } else if (marketType === "Spreads") {
        setPrefilledOdds("");
        setPrefilledBetType("Spreads");
        setPrefilledOption("");
      } else if (marketType === "Totals") {
        setPrefilledOdds("");
        setPrefilledBetType("Totals");
        setPrefilledOption("");
      } else if (marketType === "Both Teams to Score") {
        setPrefilledOdds("");
        setPrefilledBetType("Both Teams to Score");
        setPrefilledOption("");
      } else if (marketType === "Corners") {
        setPrefilledOdds("");
        setPrefilledBetType("Corners");
        setPrefilledOption("");
      } else {
        setPrefilledOdds(odd);
        setPrefilledBetType("Moneyline");
        setPrefilledOption("");
      }
      
      setShowBetModal(true);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      searchMatches(query);
    } else {
      clearResults();
    }
  };

  const displayMatches = searchQuery ? searchResults : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Card className="p-6 bg-card border-border">
            
            <div className="mb-6 flex flex-col items-center">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            {searchQuery && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {searchLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Searching...
                    </div>
                  ) : (
                    `Results for "${searchQuery}" (${displayMatches.length})`
                  )}
                </h3>
              </div>
            )}
            
            <div className="space-y-6">
              {searchLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : displayMatches.length > 0 ? (
                displayMatches.map((match, index) => (
                  <div key={match.id || index}>
                    {index === 0 && (
                      <div className="mb-4">
                        <p className="font-medium text-muted-foreground">{match.date}</p>
                      </div>
                    )}
                    
                    <div className="border-b border-border pb-4 last:border-b-0">
                      <div className="flex items-center justify-between hover:bg-muted/20 rounded-lg p-2 -m-2 transition-colors">
                        {/* Clickable match area */}
                        <div 
                          className="flex items-center gap-4 cursor-pointer flex-1"
                          onClick={() => handleMatchClick({
                            ...match,
                            homeTeam: match.homeTeam || match.home,
                            awayTeam: match.awayTeam || match.away
                          })}
                        >
                          <span className="font-bold text-lg">{match.time}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{match.homeTeam || match.home}</span>
                            <span className="text-muted-foreground">vs</span>
                            <span className="font-medium">{match.awayTeam || match.away}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">1</span>
                            <button
                              onClick={() => handleBetClick(`${match.homeTeam || match.home} x ${match.awayTeam || match.away}`, match.homeTeam || match.home, match.homeOdd || '2.00')}
                              className="px-3 py-2 bg-muted/50 hover:bg-muted border border-border rounded text-sm font-medium transition-colors"
                            >
                              {match.homeOdd || '2.00'}
                              <span className="text-success ml-1">▲</span>
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">N</span>
                            <button
                              onClick={() => handleBetClick(`${match.homeTeam || match.home} x ${match.awayTeam || match.away}`, "Draw", match.drawOdd || '3.20')}
                              className="px-3 py-2 bg-muted/50 hover:bg-muted border border-border rounded text-sm font-medium transition-colors"
                            >
                              {match.drawOdd || '3.20'}
                              <span className="text-success ml-1">▲</span>
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">2</span>
                            <button
                              onClick={() => handleBetClick(`${match.homeTeam || match.home} x ${match.awayTeam || match.away}`, match.awayTeam || match.away, match.awayOdd || '2.80')}
                              className="px-3 py-2 bg-muted/50 hover:bg-muted border border-border rounded text-sm font-medium transition-colors"
                            >
                              {match.awayOdd || '2.80'}
                              <span className="text-destructive ml-1">▼</span>
                            </button>
                          </div>
                          
                          <button 
                            className="font-bold text-xl text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => navigate(`/match/${match.id}`)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : searchQuery ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No events found for "{searchQuery}"</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Use the search bar to find matches</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      <LogBetModal
        open={showBetModal}
        onOpenChange={setShowBetModal}
        selectedMatch={selectedMatch}
        selectedBet={selectedBet}
        prefilledOdds={prefilledOdds}
        prefilledBetType={prefilledBetType}
        prefilledOption={prefilledOption}
      />

      <MatchDetailsModal
        open={showMatchDetailsModal}
        onOpenChange={setShowMatchDetailsModal}
        match={selectedMatchDetails}
        onBetClick={handleBetFromDetailsModal}
      />
    </div>
  );
};

export default Index;
