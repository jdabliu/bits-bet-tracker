import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import MatchCard from "@/components/MatchCard";
import MatchDetails from "@/pages/MatchDetails";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMatchDetails, setShowMatchDetails] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowResults(true);
  };

  const handleMatchClick = () => {
    setShowMatchDetails(true);
  };

  const handleBackToSearch = () => {
    setShowMatchDetails(false);
  };

  if (showMatchDetails) {
    return <MatchDetails onBack={handleBackToSearch} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">BITS</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Rastreamento de Apostas
            </p>
          </div>

          <SearchBar onSearch={handleSearch} />

          {showResults && searchQuery && (
            <div className="mt-8 w-full max-w-md">
              <div className="space-y-4">
                <MatchCard
                  homeTeam="Flamengo"
                  awayTeam="Chelsea"
                  onClick={handleMatchClick}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
