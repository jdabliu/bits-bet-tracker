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
      
      <div className="space-y-1">
        <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-3 px-1">
          <span className="text-center font-medium">{homeTeam}</span>
          <span className="text-center font-medium">LINHA</span>
          <span className="text-center font-medium">{awayTeam}</span>
        </div>
        
        {options.map((option, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 items-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-10 bg-secondary/50 hover:bg-secondary border-border font-medium"
              onClick={() => onBetClick?.(`${homeTeam} ${option.handicap}`, option.homeOdd, "Handicap", option.handicap)}
            >
              <div className="text-center">
                <div className="text-xs text-muted-foreground">{option.handicap}</div>
                <div className="font-semibold">{option.homeOdd}</div>
              </div>
            </Button>
            
            <div className="flex items-center justify-center bg-primary/10 rounded-md py-2 px-1">
              <span className="text-sm font-bold text-primary">{option.handicap}</span>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="h-10 bg-secondary/50 hover:bg-secondary border-border font-medium"
              onClick={() => onBetClick?.(`${awayTeam} ${option.handicap}`, option.awayOdd, "Handicap", option.handicap)}
            >
              <div className="text-center">
                <div className="text-xs text-muted-foreground">{option.handicap}</div>
                <div className="font-semibold">{option.awayOdd}</div>
              </div>
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default HandicapCard;