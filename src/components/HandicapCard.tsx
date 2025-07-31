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
  onBetClick?: (betType: string, odd: string, market?: string, line?: string, handicapLine?: string) => void;
}

const HandicapCard = ({ title, homeTeam, awayTeam, options, onBetClick }: HandicapCardProps) => {
  return (
    <Card className="p-0 bg-card border-border overflow-hidden">
      <div className="text-center font-medium text-white bg-primary py-3">
        Handicap
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
          <span className="text-center font-medium">HOME</span>
          <span className="text-center font-medium">AWAY</span>
        </div>
        
        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={index} className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-16 bg-secondary/50 hover:bg-secondary border-border font-medium flex flex-col justify-center"
                onClick={() => onBetClick?.(`${homeTeam} ${option.handicap}`, option.homeOdd, "Spreads", 
                  option.handicap.startsWith('-') ? `home_${option.handicap}` : `home_${option.handicap.replace('+', '')}`, option.handicap)}
              >
                <div className="text-xs text-muted-foreground mb-1">{option.handicap}</div>
                <div className="font-bold text-lg">{option.homeOdd}</div>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="h-16 bg-secondary/50 hover:bg-secondary border-border font-medium flex flex-col justify-center"
                onClick={() => onBetClick?.(`${awayTeam} ${option.handicap}`, option.awayOdd, "Spreads", 
                  option.handicap.startsWith('-') ? `away_${option.handicap}` : `away_${option.handicap.replace('+', '')}`, option.handicap)}
              >
                <div className="text-xs text-muted-foreground mb-1">{option.handicap}</div>
                <div className="font-bold text-lg">{option.awayOdd}</div>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default HandicapCard;