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
}

const OddsCard = ({ 
  title, 
  homeTeam, 
  awayTeam, 
  homeOdd, 
  drawOdd, 
  awayOdd,
  isActive = false 
}: OddsCardProps) => {
  const cardBg = isActive ? "bg-primary" : "bg-card";
  const textColor = isActive ? "text-primary-foreground" : "text-card-foreground";

  return (
    <Card className={`p-4 ${cardBg} border-border`}>
      <div className={`text-center mb-4 font-medium ${textColor}`}>
        {title}
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className={`text-sm ${textColor}`}>1</span>
          <span className={`text-sm ${textColor}`}>N</span>
          <span className={`text-sm ${textColor}`}>2</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className={`font-medium ${textColor}`}>{homeTeam}</span>
          <span className={`font-medium ${textColor}`}>{awayTeam}</span>
        </div>
        
        <div className="flex justify-between items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-muted/50 hover:bg-muted text-foreground border-border"
          >
            {homeOdd} <span className="text-success ml-1">▲</span>
          </Button>
          
          {drawOdd && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 bg-muted/50 hover:bg-muted text-foreground border-border"
            >
              {drawOdd} <span className="text-destructive ml-1">▼</span>
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-muted/50 hover:bg-muted text-foreground border-border"
          >
            {awayOdd} <span className="text-destructive ml-1">▼</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default OddsCard;