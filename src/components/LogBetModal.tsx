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
import { useState } from "react";

interface LogBetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMatch?: string;
  selectedBet?: string;
}

const LogBetModal = ({ open, onOpenChange, selectedMatch = "Flamengo x Chelsea", selectedBet }: LogBetModalProps) => {
  const [odds, setOdds] = useState("");
  const [stake, setStake] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("Match");
  const [selectedBetType, setSelectedBetType] = useState("Spreads");
  const [selectedOption, setSelectedOption] = useState("");

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
            {/* Match Selection */}
            <div className="space-y-2">
              <Select defaultValue={selectedMatch}>
                <SelectTrigger className="w-full bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="Flamengo x Chelsea">{selectedMatch} [Pre-match]</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Period Selection */}
            <div className="space-y-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-full bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
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
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="Moneyline">Moneyline (3-way)</SelectItem>
                  <SelectItem value="Spreads">Spreads</SelectItem>
                  <SelectItem value="Totals">Totals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Specific Option Selection */}
            <div className="space-y-2">
              <Select value={selectedOption} onValueChange={setSelectedOption}>
                <SelectTrigger className="w-full bg-background border-border">
                  <SelectValue placeholder="-1.25 Flamengo" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="home_0.0">0 Flamengo</SelectItem>
                  <SelectItem value="away_0.0">0 Chelsea</SelectItem>
                  <SelectItem value="home_-0.25">-0.25 Flamengo</SelectItem>
                  <SelectItem value="away_0.25">+0.25 Chelsea</SelectItem>
                  <SelectItem value="home_0.25">+0.25 Flamengo</SelectItem>
                  <SelectItem value="away_-0.25">-0.25 Chelsea</SelectItem>
                  <SelectItem value="home_-0.5">-0.5 Flamengo</SelectItem>
                  <SelectItem value="away_0.5">+0.5 Chelsea</SelectItem>
                  <SelectItem value="home_0.5">+0.5 Flamengo</SelectItem>
                  <SelectItem value="away_-0.5">-0.5 Chelsea</SelectItem>
                  <SelectItem value="home_-0.75">-0.75 Flamengo</SelectItem>
                  <SelectItem value="away_0.75">+0.75 Chelsea</SelectItem>
                  <SelectItem value="home_0.75">+0.75 Flamengo</SelectItem>
                  <SelectItem value="away_-0.75">-0.75 Chelsea</SelectItem>
                  <SelectItem value="home_-1.0">-1 Flamengo</SelectItem>
                  <SelectItem value="away_1.0">+1 Chelsea</SelectItem>
                  <SelectItem value="home_-1.25">-1.25 Flamengo</SelectItem>
                  <SelectItem value="away_1.25">+1.25 Chelsea</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator className="border-border" />

            {/* Odds, Stake and EV */}
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
                
                <div className="space-y-2">
                  <Label>EV</Label>
                  <div className="flex h-10 w-24 items-center justify-center rounded px-3 border border-muted bg-muted/10 text-muted-foreground">
                    <p className="truncate font-mono text-sm">N/A</p>
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
                  <SelectContent className="bg-popover border-border">
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