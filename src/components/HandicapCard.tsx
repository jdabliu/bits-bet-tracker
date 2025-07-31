import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HandicapOption {
  handicap: string;
  homeOdd: string;
  awayOdd: string;
}

interface HandicapCardProps {
  title: string;
  homeTeam: string;
  awayTeam: string;
  options: HandicapOption[];
  onBetClick?: (betType: string, odd: string, market?: string, line?: string) => void;
}

const HandicapCard = ({ title, homeTeam, awayTeam, options, onBetClick }: HandicapCardProps) => {
  return (
    <Card className="p-4 bg-card border-border">
      <div className="text-center mb-4 font-medium text-primary bg-primary/20 py-2 rounded">
        {title}
      </div>
      
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground mb-2">
          <span className="text-center">{homeTeam}</span>
          <span className="text-center">Handicap</span>
          <span className="text-center">{awayTeam}</span>
        </div>
        
        {options.map((option, index) => (
          <div key={index} className="grid grid-cols-3 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-muted/30 hover:bg-muted text-foreground border-border"
              onClick={() => onBetClick?.(`${option.handicap} ${homeTeam}`, option.homeOdd, "Handicap", option.handicap)}
            >
              {option.homeOdd} <span className="text-success ml-1">▲</span>
            </Button>
            
            <div className="flex items-center justify-center bg-muted/20 rounded text-sm font-medium">
              {option.handicap}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-muted/30 hover:bg-muted text-foreground border-border"
              onClick={() => onBetClick?.(`${option.handicap} ${awayTeam}`, option.awayOdd, "Handicap", option.handicap)}
            >
              {option.awayOdd} <span className="text-destructive ml-1">▼</span>
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HandicapCard;