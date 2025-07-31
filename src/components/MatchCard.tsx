import { Card } from "@/components/ui/card";

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  onClick: () => void;
}

const MatchCard = ({ homeTeam, awayTeam, onClick }: MatchCardProps) => {
  return (
    <Card 
      className="p-4 cursor-pointer hover:bg-secondary/50 transition-colors border-border bg-card"
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        <span className="text-lg font-medium text-foreground">
          {homeTeam} x {awayTeam}
        </span>
      </div>
    </Card>
  );
};

export default MatchCard;