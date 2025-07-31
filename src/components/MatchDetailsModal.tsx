import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MatchDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  match?: {
    homeTeam: string;
    awayTeam: string;
    time: string;
    date: string;
    homeOdd: string;
    drawOdd: string;
    awayOdd: string;
  };
  onBetClick: (betType: string, odd: string) => void;
}

const MatchDetailsModal = ({ 
  open, 
  onOpenChange, 
  match,
  onBetClick 
}: MatchDetailsModalProps) => {
  if (!match) return null;

  const handleOddClick = (betType: string, odd: string) => {
    onBetClick(betType, odd);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[500px] max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            {match.homeTeam} vs {match.awayTeam}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informações da partida */}
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-primary">{match.time}</div>
            <div className="text-sm text-muted-foreground">{match.date}</div>
          </div>

          <Separator />

          {/* Times */}
          <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
            <div className="text-center flex-1">
              <div className="font-semibold text-lg">{match.homeTeam}</div>
              <div className="text-sm text-muted-foreground">Casa</div>
            </div>
            <div className="text-2xl font-bold text-muted-foreground px-4">VS</div>
            <div className="text-center flex-1">
              <div className="font-semibold text-lg">{match.awayTeam}</div>
              <div className="text-sm text-muted-foreground">Visitante</div>
            </div>
          </div>

          {/* Odds principais (1X2) */}
          <div className="space-y-3">
            <h4 className="font-semibold">Resultado Final (1X2)</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center space-y-2">
                <div className="text-xs text-muted-foreground">1</div>
                <Button
                  onClick={() => handleOddClick(match.homeTeam, match.homeOdd)}
                  className="w-full bg-muted/50 hover:bg-muted text-foreground border border-border"
                  variant="outline"
                >
                  <div className="flex items-center gap-1">
                    <span>{match.homeOdd}</span>
                    <TrendingUp className="h-3 w-3 text-success" />
                  </div>
                </Button>
                <div className="text-xs font-medium">{match.homeTeam}</div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-xs text-muted-foreground">X</div>
                <Button
                  onClick={() => handleOddClick("Empate", match.drawOdd)}
                  className="w-full bg-muted/50 hover:bg-muted text-foreground border border-border"
                  variant="outline"
                >
                  <div className="flex items-center gap-1">
                    <span>{match.drawOdd}</span>
                    <TrendingUp className="h-3 w-3 text-success" />
                  </div>
                </Button>
                <div className="text-xs font-medium">Empate</div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-xs text-muted-foreground">2</div>
                <Button
                  onClick={() => handleOddClick(match.awayTeam, match.awayOdd)}
                  className="w-full bg-muted/50 hover:bg-muted text-foreground border border-border"
                  variant="outline"
                >
                  <div className="flex items-center gap-1">
                    <span>{match.awayOdd}</span>
                    <TrendingDown className="h-3 w-3 text-destructive" />
                  </div>
                </Button>
                <div className="text-xs font-medium">{match.awayTeam}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Mercados adicionais */}
          <div className="space-y-3">
            <h4 className="font-semibold">Outros Mercados</h4>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-12 bg-muted/30 hover:bg-muted border-border"
              >
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Total de Gols</div>
                  <div className="font-medium">+</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="h-12 bg-muted/30 hover:bg-muted border-border"
              >
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Handicap</div>
                  <div className="font-medium">+</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="h-12 bg-muted/30 hover:bg-muted border-border"
              >
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Ambos Marcam</div>
                  <div className="font-medium">+</div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="h-12 bg-muted/30 hover:bg-muted border-border"
              >
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">Escanteios</div>
                  <div className="font-medium">+</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Botão fechar */}
          <div className="flex justify-end">
            <Button 
              onClick={() => onOpenChange(false)}
              variant="secondary"
              className="bg-secondary hover:bg-secondary/80"
            >
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MatchDetailsModal;