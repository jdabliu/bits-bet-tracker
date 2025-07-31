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
import { X, Plus, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState([
    "Value Bet",
    "Safe Bet", 
    "High Risk"
  ]);
  const [newTagInput, setNewTagInput] = useState("");
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      setSelectedTags([]);
      setNewTagInput("");
      setIsTagDropdownOpen(false);
    }
  }, [open]);

  // Effect to handle clicking outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTagDropdownOpen(false);
      }
    };

    if (isTagDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTagDropdownOpen]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleCreateNewTag = () => {
    if (newTagInput.trim() && !availableTags.includes(newTagInput.trim())) {
      const newTag = newTagInput.trim();
      setAvailableTags(prev => [...prev, newTag]);
      setSelectedTags(prev => [...prev, newTag]);
      setNewTagInput("");
    }
  };

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
    console.log({ 
      odds, 
      stake, 
      selectedPeriod, 
      selectedBetType, 
      selectedOption, 
      selectedTags 
    });
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
                <Label>Tags (optional)</Label>
                
                {/* Selected Tags Display */}
                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedTags.map((tag) => (
                      <div
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleTagToggle(tag)}
                          className="hover:bg-primary/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Custom Tags Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-left hover:bg-muted/20 transition-colors"
                  >
                    <span className="text-muted-foreground">
                      {selectedTags.length > 0 
                        ? `${selectedTags.length} tag(s) selecionada(s)`
                        : "Selecionar tags"
                      }
                    </span>
                  </button>
                  
                  {isTagDropdownOpen && (
                    <div className="absolute bottom-full left-0 right-0 mb-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
                      <div className="p-2">
                        {/* New Tag Input */}
                        <div className="flex gap-2 mb-2">
                          <Input
                            value={newTagInput}
                            onChange={(e) => setNewTagInput(e.target.value)}
                            placeholder="Nova tag..."
                            className="flex-1 h-8 bg-background border-border"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleCreateNewTag();
                              }
                            }}
                          />
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleCreateNewTag}
                            disabled={!newTagInput.trim()}
                            className="h-8 px-2 bg-primary hover:bg-primary/90"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        {/* Available Tags */}
                        <div className="space-y-1">
                          {availableTags.map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => handleTagToggle(tag)}
                              className="w-full flex items-center justify-between px-2 py-1.5 hover:bg-muted/50 rounded text-sm text-left transition-colors"
                            >
                              <span>{tag}</span>
                              {selectedTags.includes(tag) && (
                                <Check className="h-3 w-3 text-primary" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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