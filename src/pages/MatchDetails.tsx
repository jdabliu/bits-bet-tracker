import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMatchDetails } from "@/hooks/useMatchDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import OddsCard from "@/components/OddsCard";
import HandicapCard from "@/components/HandicapCard";
import OverUnderCard from "@/components/OverUnderCard";
import LogBetModal from "@/components/LogBetModal";

const MatchDetails = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { matchDetails, loading, error } = useMatchDetails(matchId);
  const [showLogBetModal, setShowLogBetModal] = useState(false);
  const [selectedBet, setSelectedBet] = useState<{ type: string; odd: string; market?: string; line?: string; handicapLine?: string; totalLine?: string } | null>(null);

  const handleBetClick = (betType: string, odd: string, market?: string, line?: string, handicapLine?: string, totalLine?: string) => {
    setSelectedBet({ type: betType, odd, market, line, handicapLine, totalLine });
    setShowLogBetModal(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Dados padrão caso não venham do backend
  const defaultHandicapOptions = [
    { handicap: "+0.50", homeOdd: "1.35", awayOdd: "3.09" },
    { handicap: "+0.25", homeOdd: "1.43", awayOdd: "2.72" },
    { handicap: "+0.00", homeOdd: "1.58", awayOdd: "2.36" },
    { handicap: "-0.25", homeOdd: "1.86", awayOdd: "1.95" },
    { handicap: "-0.50", homeOdd: "2.12", awayOdd: "1.71" },
    { handicap: "-0.75", homeOdd: "2.44", awayOdd: "1.53" }
  ];

  const defaultOverUnderOptions = [
    { line: "2.00", overOdd: "1.33", underOdd: "3.15" },
    { line: "2.25", overOdd: "1.53", underOdd: "2.41" },
    { line: "2.50", overOdd: "1.74", underOdd: "2.06" },
    { line: "2.75", overOdd: "1.94", underOdd: "1.86" },
    { line: "3.00", overOdd: "2.24", underOdd: "1.63" },
    { line: "3.25", overOdd: "2.50", underOdd: "1.49" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span>Loading match details...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !matchDetails) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="mr-4 hover:bg-secondary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
            <p className="text-muted-foreground">{error || "Match not found"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="mr-4 hover:bg-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            {matchDetails.homeTeam} - {matchDetails.awayTeam}
          </h1>
          <p className="text-muted-foreground">
            {matchDetails.date} - {matchDetails.time}
          </p>
        </div>

        <div className="mb-8">
          <div className="flex gap-4 mb-4">
            <Button variant="default" className="bg-primary hover:bg-primary/90">
              JOGO
            </Button>
            <Button variant="outline" className="border-border">
              1º TEMPO
            </Button>
          </div>

          <OddsCard
            title="1(N)2"
            homeTeam={matchDetails.homeTeam}
            awayTeam={matchDetails.awayTeam}
            homeOdd={matchDetails.homeOdd}
            drawOdd={matchDetails.drawOdd}
            awayOdd={matchDetails.awayOdd}
            isActive={true}
            onBetClick={handleBetClick}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HandicapCard
            title="Handicap ?"
            homeTeam={matchDetails.homeTeam.toUpperCase()}
            awayTeam={matchDetails.awayTeam.toUpperCase()}
            options={matchDetails.handicapOptions || defaultHandicapOptions}
            onBetClick={handleBetClick}
          />

          <OverUnderCard
            title="Pontos: mais/menos"
            options={matchDetails.overUnderOptions || defaultOverUnderOptions}
            onBetClick={handleBetClick}
          />
        </div>
      </div>

      <LogBetModal
        open={showLogBetModal}
        onOpenChange={setShowLogBetModal}
        selectedMatch={`${matchDetails.homeTeam} x ${matchDetails.awayTeam}`}
        selectedBet={selectedBet?.type}
        prefilledOdds={selectedBet?.odd || ""}
        prefilledBetType={selectedBet?.market || "Moneyline"}
        prefilledOption={selectedBet?.market === "Moneyline" && selectedBet?.line ?
          selectedBet.line :
          selectedBet?.market === "Spreads" && selectedBet?.line ? 
            selectedBet.line
            : selectedBet?.market === "Totals" && selectedBet?.line ?
              selectedBet.line
            : ""
        }
      />
    </div>
  );
};

export default MatchDetails;