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
      
      <div className="space-y-1">
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3 px-1">
          <span className="text-center font-medium">MAIS DE</span>
          <span className="text-center font-medium">MENOS DE</span>
        </div>
        
        {options.map((option, index) => (
          <div key={index} className="grid grid-cols-2 gap-2 items-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-12 bg-secondary/50 hover:bg-secondary border-border font-medium"
              onClick={() => onBetClick?.(`Mais de ${option.line}`, option.overOdd, "Over/Under", option.line)}
            >
              <div className="text-center">
                <div className="text-xs text-muted-foreground">MAIS {option.line}</div>
                <div className="font-semibold text-sm">{option.overOdd}</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="h-12 bg-secondary/50 hover:bg-secondary border-border font-medium"
              onClick={() => onBetClick?.(`Menos de ${option.line}`, option.underOdd, "Over/Under", option.line)}
            >
              <div className="text-center">
                <div className="text-xs text-muted-foreground">MENOS {option.line}</div>
                <div className="font-semibold text-sm">{option.underOdd}</div>
              </div>
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default OverUnderCard;