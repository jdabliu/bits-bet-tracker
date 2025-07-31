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
  onBetClick?: (betType: string, odd: string, market?: string, line?: string, totalLine?: string) => void;
}

const OverUnderCard = ({ title, options, onBetClick }: OverUnderCardProps) => {
  return (
    <Card className="p-0 bg-card border-border overflow-hidden">
      <div className="text-center font-medium text-white bg-primary py-3">
        Totals
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
          <span className="text-center font-medium">Over</span>
          <span className="text-center font-medium">Under</span>
        </div>
        
        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={index} className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-16 bg-secondary/50 hover:bg-secondary border-border font-medium flex flex-col justify-center"
                onClick={() => onBetClick?.(`Mais de ${option.line}`, option.overOdd, "Totals", `over_${option.line}`, option.line)}
              >
                <div className="text-xs text-muted-foreground mb-1">Over {option.line}</div>
                <div className="font-bold text-lg">{option.overOdd}</div>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="h-16 bg-secondary/50 hover:bg-secondary border-border font-medium flex flex-col justify-center"
                onClick={() => onBetClick?.(`Menos de ${option.line}`, option.underOdd, "Totals", `under_${option.line}`, option.line)}
              >
                <div className="text-xs text-muted-foreground mb-1">Under {option.line}</div>
                <div className="font-bold text-lg">{option.underOdd}</div>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default OverUnderCard;