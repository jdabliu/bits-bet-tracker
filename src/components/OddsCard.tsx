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
  onBetClick?: (betType: string, odd: string) => void;
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
  const cardBg = isActive ? "bg-primary" : "bg-card";
  const textColor = isActive ? "text-primary-foreground" : "text-card-foreground";

  return (
    <Card className={`p-3 max-w-2xl mx-auto ${cardBg} border-border`}>
      <div className={`text-center mb-3 text-sm font-medium ${textColor}`}>
        {title}
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center px-4">
          <span className={`text-xs ${textColor}`}>1</span>
          <span className={`text-xs ${textColor}`}>N</span>
          <span className={`text-xs ${textColor}`}>2</span>
        </div>
        
        <div className="flex justify-between items-center px-4">
          <span className={`text-sm font-medium ${textColor} text-left`}>{homeTeam}</span>
          <span className={`text-sm font-medium ${textColor} text-right`}>{awayTeam}</span>
        </div>
        
        <div className="flex justify-between items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-muted/50 hover:bg-muted text-foreground border-border"
            onClick={() => onBetClick?.(homeTeam, homeOdd)}
          >
            {homeOdd} <span className="text-success ml-1">▲</span>
          </Button>
          
          {drawOdd && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 bg-muted/50 hover:bg-muted text-foreground border-border"
              onClick={() => onBetClick?.("Draw", drawOdd)}
            >
              {drawOdd} <span className="text-destructive ml-1">▼</span>
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-muted/50 hover:bg-muted text-foreground border-border"
            onClick={() => onBetClick?.(awayTeam, awayOdd)}
          >
            {awayOdd} <span className="text-destructive ml-1">▼</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OddsCard;