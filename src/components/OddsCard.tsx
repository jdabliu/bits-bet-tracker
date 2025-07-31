import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OddsCardProps {
  title: string;
  homeTeam: string;
  awayTeam: string;
  homeOdd: string;
  drawOdd?: string;
  awayOdd: string;
  isActive?: boolean;
  onBetClick?: (betType: string, odd: string, market?: string, line?: string) => void;
}

const OddsCard = ({ 
  title, 
  homeTeam, 
  awayTeam, 
  homeOdd, 
  drawOdd, 
  awayOdd,
  isActive = false,
  onBetClick
}: OddsCardProps) => {
  return (
    <Card className="p-0 bg-card border-border overflow-hidden max-w-2xl mx-auto">
      <div className="text-center font-medium text-white bg-primary py-3">
        1(N)2
      </div>
      
      <div className="p-4">
        <div className={`grid ${drawOdd ? 'grid-cols-3' : 'grid-cols-2'} gap-2 text-xs text-muted-foreground mb-3`}>
          <span className="text-center font-medium">1</span>
          {drawOdd && <span className="text-center font-medium">N</span>}
          <span className="text-center font-medium">2</span>
        </div>
        
        <div className={`grid ${drawOdd ? 'grid-cols-3' : 'grid-cols-2'} gap-2`}>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-16 bg-secondary/50 hover:bg-secondary border-border font-medium flex flex-col justify-center"
            onClick={() => onBetClick?.(homeTeam, homeOdd, "Moneyline", "home")}
          >
            <div className="text-xs text-muted-foreground mb-1">{homeTeam.split(' ')[0]}</div>
            <div className="font-bold text-lg">{homeOdd}</div>
          </Button>
          
          {drawOdd && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-16 bg-secondary/50 hover:bg-secondary border-border font-medium flex flex-col justify-center"
              onClick={() => onBetClick?.("Draw", drawOdd, "Moneyline", "draw")}
            >
              <div className="text-xs text-muted-foreground mb-1">Draw</div>
              <div className="font-bold text-lg">{drawOdd}</div>
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-16 bg-secondary/50 hover:bg-secondary border-border font-medium flex flex-col justify-center"
            onClick={() => onBetClick?.(awayTeam, awayOdd, "Moneyline", "away")}
          >
            <div className="text-xs text-muted-foreground mb-1">{awayTeam.split(' ')[0]}</div>
            <div className="font-bold text-lg">{awayOdd}</div>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OddsCard;