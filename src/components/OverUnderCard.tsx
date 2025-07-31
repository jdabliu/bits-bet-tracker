import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OverUnderOption {
  line: string;
  overOdd: string;
  underOdd: string;
}

interface OverUnderCardProps {
  title: string;
  options: OverUnderOption[];
  onBetClick?: (betType: string, odd: string, market?: string, line?: string) => void;
}

const OverUnderCard = ({ title, options, onBetClick }: OverUnderCardProps) => {
  return (
    <Card className="p-4 bg-card border-border">
      <div className="text-center mb-4 font-medium text-primary bg-primary/20 py-2 rounded">
        {title}
      </div>
      
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-2">
          <span className="text-center">Mais de {options[0]?.line}</span>
          <span className="text-center">Menos de {options[0]?.line}</span>
        </div>
        
        {options.map((option, index) => (
          <div key={index} className="space-y-2">
            <div className="text-center text-sm font-medium text-muted-foreground">
              Mais de {option.line}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-muted/30 hover:bg-muted text-foreground border-border"
                onClick={() => onBetClick?.(`Mais de ${option.line}`, option.overOdd, "Over/Under", option.line)}
              >
                {option.overOdd} <span className="text-success ml-1">▲</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-muted/30 hover:bg-muted text-foreground border-border"
                onClick={() => onBetClick?.(`Menos de ${option.line}`, option.underOdd, "Over/Under", option.line)}
              >
                {option.underOdd} <span className="text-success ml-1">▲</span>
              </Button>
            </div>
            
            <div className="text-center text-sm font-medium text-muted-foreground">
              Menos de {option.line}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default OverUnderCard;