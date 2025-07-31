import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import OddsCard from "@/components/OddsCard";
import HandicapCard from "@/components/HandicapCard";
import OverUnderCard from "@/components/OverUnderCard";
import LogBetModal from "@/components/LogBetModal";

const MatchDetails = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [showLogBetModal, setShowLogBetModal] = useState(false);
  const [selectedBet, setSelectedBet] = useState<{ type: string; odd: string } | null>(null);

  // Sample match data - in a real app this would come from an API based on matchId
  const matches = [
    {
      id: "1",
      homeTeam: "Athletico Paranaense",
      awayTeam: "Vasco da Gama",
      date: "Wednesday, July 30th, 2025",
      time: "4:00 PM",
      homeOdd: "2.13",
      drawOdd: "3.44",
      awayOdd: "3.15"
    },
    {
      id: "2", 
      homeTeam: "Palmeiras",
      awayTeam: "Juventude",
      date: "Wednesday, July 30th, 2025",
      time: "4:00 PM",
      homeOdd: "1.29",
      drawOdd: "5.37",
      awayOdd: "8.65"
    },
    {
      id: "3",
      homeTeam: "RB Bragantino",
      awayTeam: "Fortaleza", 
      date: "Wednesday, July 30th, 2025",
      time: "7:00 PM",
      homeOdd: "1.72",
      drawOdd: "3.90",
      awayOdd: "4.14"
    }
  ];

  const match = matches.find(m => m.id === matchId) || matches[0];

  const handleBetClick = (betType: string, odd: string) => {
    setSelectedBet({ type: betType, odd });
    setShowLogBetModal(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handicapOptions = [
    { handicap: "+0.50", homeOdd: "1.35", awayOdd: "3.09" },
    { handicap: "+0.25", homeOdd: "1.43", awayOdd: "2.72" },
    { handicap: "+0.00", homeOdd: "1.58", awayOdd: "2.36" },
    { handicap: "-0.25", homeOdd: "1.86", awayOdd: "1.95" },
    { handicap: "-0.50", homeOdd: "2.12", awayOdd: "1.71" },
    { handicap: "-0.75", homeOdd: "2.44", awayOdd: "1.53" }
  ];

  const overUnderOptions = [
    { line: "2.00", overOdd: "1.33", underOdd: "3.15" },
    { line: "2.25", overOdd: "1.53", underOdd: "2.41" },
    { line: "2.50", overOdd: "1.74", underOdd: "2.06" },
    { line: "2.75", overOdd: "1.94", underOdd: "1.86" },
    { line: "3.00", overOdd: "2.24", underOdd: "1.63" },
    { line: "3.25", overOdd: "2.50", underOdd: "1.49" }
  ];

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
            {match.homeTeam} - {match.awayTeam}
          </h1>
          <p className="text-muted-foreground">
            {match.date} - {match.time}
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
            homeTeam={match.homeTeam}
            awayTeam={match.awayTeam}
            homeOdd={match.homeOdd}
            drawOdd={match.drawOdd}
            awayOdd={match.awayOdd}
            isActive={true}
            onBetClick={handleBetClick}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HandicapCard
            title="Handicap ?"
            homeTeam={match.homeTeam.toUpperCase()}
            awayTeam={match.awayTeam.toUpperCase()}
            options={handicapOptions}
            onBetClick={handleBetClick}
          />

          <OverUnderCard
            title="Pontos: mais/menos"
            options={overUnderOptions}
            onBetClick={handleBetClick}
          />
        </div>
      </div>

      <LogBetModal
        open={showLogBetModal}
        onOpenChange={setShowLogBetModal}
        selectedMatch={`${match.homeTeam} x ${match.awayTeam}`}
        selectedBet={selectedBet?.type}
        prefilledOdds=""
        prefilledBetType=""
        prefilledOption=""
      />
    </div>
  );
};

export default MatchDetails;