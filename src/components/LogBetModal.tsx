import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";

interface LogBetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMatch?: string;
  selectedBet?: string;
  prefilledOdds?: string;
  prefilledBetType?: string;
  prefilledOption?: string;
}

const LogBetModal = ({ 
  open, 
  onOpenChange, 
  selectedMatch = "Flamengo x Chelsea", 
  selectedBet,
  prefilledOdds,
  prefilledBetType,
  prefilledOption
}: LogBetModalProps) => {
  const [odds, setOdds] = useState("");
  const [stake, setStake] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("Match");
  const [selectedBetType, setSelectedBetType] = useState("Moneyline");
  const [selectedOption, setSelectedOption] = useState("");

  // Effect to update state when prefilled values change
  useEffect(() => {
    if (prefilledOdds) setOdds(prefilledOdds);
    if (prefilledBetType) setSelectedBetType(prefilledBetType);
    if (prefilledOption) setSelectedOption(prefilledOption);
  }, [prefilledOdds, prefilledBetType, prefilledOption]);

  // Effect to reset form when modal closes
  useEffect(() => {
    if (!open) {
      setOdds("");
      setStake("");
      setSelectedPeriod("Match");
      setSelectedBetType("Moneyline");
      setSelectedOption("");
    }
  }, [open]);

  // Determinar as opções baseadas no tipo de aposta selecionado
  const getBetOptions = () => {
    switch(selectedBetType) {
      case "Moneyline":
        return [
          { value: "home", label: `${selectedMatch.split(' x ')[0]} (Casa)` },
          { value: "draw", label: "Empate" },
          { value: "away", label: `${selectedMatch.split(' x ')[1]} (Fora)` }
        ];
      case "Spreads":
        return [
          { value: "home_0.0", label: `0 ${selectedMatch.split(' x ')[0]}` },
          { value: "away_0.0", label: `0 ${selectedMatch.split(' x ')[1]}` },
          { value: "home_-0.25", label: `-0.25 ${selectedMatch.split(' x ')[0]}` },
          { value: "away_0.25", label: `+0.25 ${selectedMatch.split(' x ')[1]}` },
          { value: "home_0.25", label: `+0.25 ${selectedMatch.split(' x ')[0]}` },
          { value: "away_-0.25", label: `-0.25 ${selectedMatch.split(' x ')[1]}` },
          { value: "home_-0.5", label: `-0.5 ${selectedMatch.split(' x ')[0]}` },
          { value: "away_0.5", label: `+0.5 ${selectedMatch.split(' x ')[1]}` },
          { value: "home_0.5", label: `+0.5 ${selectedMatch.split(' x ')[0]}` },
          { value: "away_-0.5", label: `-0.5 ${selectedMatch.split(' x ')[1]}` },
          { value: "home_-0.75", label: `-0.75 ${selectedMatch.split(' x ')[0]}` },
          { value: "away_0.75", label: `+0.75 ${selectedMatch.split(' x ')[1]}` },
          { value: "home_0.75", label: `+0.75 ${selectedMatch.split(' x ')[0]}` },
          { value: "away_-0.75", label: `-0.75 ${selectedMatch.split(' x ')[1]}` },
          { value: "home_-1.0", label: `-1 ${selectedMatch.split(' x ')[0]}` },
          { value: "away_1.0", label: `+1 ${selectedMatch.split(' x ')[1]}` },
          { value: "home_-1.25", label: `-1.25 ${selectedMatch.split(' x ')[0]}` },
          { value: "away_1.25", label: `+1.25 ${selectedMatch.split(' x ')[1]}` }
        ];
      case "Totals":
        return [
          { value: "over_0.5", label: "Over 0.5 gols" },
          { value: "under_0.5", label: "Under 0.5 gols" },
          { value: "over_1.5", label: "Over 1.5 gols" },
          { value: "under_1.5", label: "Under 1.5 gols" },
          { value: "over_2.5", label: "Over 2.5 gols" },
          { value: "under_2.5", label: "Under 2.5 gols" },
          { value: "over_3.5", label: "Over 3.5 gols" },
          { value: "under_3.5", label: "Under 3.5 gols" }
        ];
      case "Both Teams to Score":
        return [
          { value: "yes", label: "Sim" },
          { value: "no", label: "Não" }
        ];
      case "Corners":
        return [
          { value: "over_8.5", label: "Over 8.5 escanteios" },
          { value: "under_8.5", label: "Under 8.5 escanteios" },
          { value: "over_9.5", label: "Over 9.5 escanteios" },
          { value: "under_9.5", label: "Under 9.5 escanteios" },
          { value: "over_10.5", label: "Over 10.5 escanteios" },
          { value: "under_10.5", label: "Under 10.5 escanteios" }
        ];
      default:
        return [];
    }
  };

  const getBetTypeLabel = () => {
    switch(selectedBetType) {
      case "Moneyline":
        return "Moneyline (3-way)";
      case "Spreads":
        return "Spreads (Handicap)";
      case "Totals":
        return "Under/Over";
      case "Both Teams to Score":
        return "Ambos Marcam";
      case "Corners":
        return "Escanteios";
      default:
        return selectedBetType;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ odds, stake, selectedPeriod, selectedBetType, selectedOption });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px] max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Log bet</DialogTitle>
        </DialogHeader>
        
        <div className="max-sm:overflow-auto max-sm:px-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Match Selection - Já pré-preenchido */}
            <div className="space-y-2">
              <Select value={selectedMatch} disabled>
                <SelectTrigger className="w-full bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  <SelectItem value={selectedMatch}>{selectedMatch} [Pre-match]</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Period Selection */}
            <div className="space-y-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-full bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  <SelectItem value="Match">Match</SelectItem>
                  <SelectItem value="1st Half">1st Half</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bet Type Selection */}
            <div className="space-y-2">
              <Select value={selectedBetType} onValueChange={setSelectedBetType}>
                <SelectTrigger className="w-full bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                  <SelectContent className="bg-popover border-border z-50">
                    <SelectItem value="Moneyline">Moneyline (3-way)</SelectItem>
                    <SelectItem value="Spreads">Spreads</SelectItem>
                    <SelectItem value="Totals">Totals</SelectItem>
                    <SelectItem value="Both Teams to Score">Both Teams to Score</SelectItem>
                    <SelectItem value="Corners">Corners</SelectItem>
                  </SelectContent>
              </Select>
            </div>

            {/* Specific Option Selection - Dinâmico baseado no tipo de aposta */}
            <div className="space-y-2">
              <Select value={selectedOption} onValueChange={setSelectedOption}>
                <SelectTrigger className="w-full bg-background border-border">
                  <SelectValue placeholder={`${getBetTypeLabel()}`} />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  {getBetOptions().map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator className="border-border" />

            {/* Odds and Stake */}
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex items-end gap-2">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="odds">Odds</Label>
                  <Input
                    id="odds"
                    type="text"
                    value={odds}
                    onChange={(e) => setOdds(e.target.value)}
                    className="bg-background border-border"
                    inputMode="numeric"
                    pattern="[0-9]*[.,]?[0-9]*"
                  />
                </div>
                
                <div className="space-y-2 flex-1">
                  <Label htmlFor="stake">Stake</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                    <Input
                      id="stake"
                      type="text"
                      value={stake}
                      onChange={(e) => setStake(e.target.value)}
                      className="pl-11 bg-background border-border"
                      inputMode="decimal"
                      pattern="[0-9]*[.,]?[0-9]{0,2}"
                    />
                  </div>
                </div>
              </div>

              {/* Tags Selection */}
              <div className="space-y-2">
                <Select>
                  <SelectTrigger className="w-full bg-background border-border">
                    <div className="mx-auto flex w-full items-center justify-between">
                      <span className="text-muted-foreground">Select tags (optional)</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border z-50">
                    <SelectItem value="value-bet">Value Bet</SelectItem>
                    <SelectItem value="safe-bet">Safe Bet</SelectItem>
                    <SelectItem value="high-risk">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="secondary"
                onClick={() => onOpenChange(false)}
                className="bg-secondary hover:bg-secondary/80"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={!odds || !stake}
                className="bg-primary hover:bg-primary/90"
              >
                Log bet
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogBetModal;