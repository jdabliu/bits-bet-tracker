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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Check, ChevronsUpDown } from "lucide-react";
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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState([
    "Value Bet",
    "Safe Bet", 
    "High Risk"
  ]);
  const [newTagInput, setNewTagInput] = useState("");
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [selectedBookmaker, setSelectedBookmaker] = useState("");
  const [isBookmakerDropdownOpen, setIsBookmakerDropdownOpen] = useState(false);
  const availableBookmakers = ["7k", "Bet365", "Pinnacle", "BetBra"];

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
      setSelectedBookmaker("");
      setIsBookmakerDropdownOpen(false);
    }
  }, [open]);

  // Effect to update state when prefilled values change
  useEffect(() => {
    if (open && prefilledOdds) setOdds(prefilledOdds);
    if (open && prefilledBetType) setSelectedBetType(prefilledBetType);
    if (open && prefilledOption) setSelectedOption(prefilledOption);
  }, [open, prefilledOdds, prefilledBetType, prefilledOption]);

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
          { value: "home", label: `${selectedMatch.split(' x ')[0]} (Home)` },
          { value: "draw", label: "Draw" },
          { value: "away", label: `${selectedMatch.split(' x ')[1]} (Away)` }
        ];
      case "Spreads":
        return [
          { value: "home_0.5", label: `+0.50 ${selectedMatch.split(' x ')[0]}` },
          { value: "away_0.5", label: `+0.50 ${selectedMatch.split(' x ')[1]}` },
          { value: "home_0.25", label: `+0.25 ${selectedMatch.split(' x ')[0]}` },
          { value: "away_0.25", label: `+0.25 ${selectedMatch.split(' x ')[1]}` },
          { value: "home_0.0", label: `+0.00 ${selectedMatch.split(' x ')[0]}` },
          { value: "away_0.0", label: `+0.00 ${selectedMatch.split(' x ')[1]}` },
          { value: "home_-0.25", label: `-0.25 ${selectedMatch.split(' x ')[0]}` },
          { value: "away_-0.25", label: `-0.25 ${selectedMatch.split(' x ')[1]}` },
          { value: "home_-0.5", label: `-0.50 ${selectedMatch.split(' x ')[0]}` },
          { value: "away_-0.5", label: `-0.50 ${selectedMatch.split(' x ')[1]}` },
          { value: "home_-0.75", label: `-0.75 ${selectedMatch.split(' x ')[0]}` },
          { value: "away_-0.75", label: `-0.75 ${selectedMatch.split(' x ')[1]}` }
        ];
      case "Totals":
        return [
          { value: "over_2.00", label: "Over 2.00 goals" },
          { value: "under_2.00", label: "Under 2.00 goals" },
          { value: "over_2.25", label: "Over 2.25 goals" },
          { value: "under_2.25", label: "Under 2.25 goals" },
          { value: "over_2.50", label: "Over 2.50 goals" },
          { value: "under_2.50", label: "Under 2.50 goals" },
          { value: "over_2.75", label: "Over 2.75 goals" },
          { value: "under_2.75", label: "Under 2.75 goals" },
          { value: "over_3.00", label: "Over 3.00 goals" },
          { value: "under_3.00", label: "Under 3.00 goals" },
          { value: "over_3.25", label: "Over 3.25 goals" },
          { value: "under_3.25", label: "Under 3.25 goals" }
        ];
      case "Both Teams to Score":
        return [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" }
        ];
      case "Corners":
        return [
          { value: "over_8.5", label: "Over 8.5 corners" },
          { value: "under_8.5", label: "Under 8.5 corners" },
          { value: "over_9.5", label: "Over 9.5 corners" },
          { value: "under_9.5", label: "Under 9.5 corners" },
          { value: "over_10.5", label: "Over 10.5 corners" },
          { value: "under_10.5", label: "Under 10.5 corners" }
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
        return "Both Teams to Score";
      case "Corners":
        return "Corners";
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
      selectedTags,
      selectedBookmaker
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

                {/* Advanced Tags Popover */}
                <Popover open={isTagDropdownOpen} onOpenChange={setIsTagDropdownOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={isTagDropdownOpen}
                      className="w-full justify-between bg-background border-border"
                    >
                      <span className="text-muted-foreground">
                        {selectedTags.length > 0 
                          ? `${selectedTags.length} tag(s) selected`
                          : "Select tags"
                        }
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent 
                    className="w-[--radix-popover-trigger-width] p-0 bg-popover border-border" 
                    side="top"
                    align="start"
                  >
                    <Command className="bg-popover">
                      <CommandInput 
                        placeholder="Search tags..." 
                        className="h-9"
                        value={newTagInput}
                        onValueChange={setNewTagInput}
                      />
                      <CommandList className="max-h-[200px]">
                        <CommandEmpty>
                          <div className="text-center py-6">
                            <p className="text-sm text-muted-foreground mb-2">
                              No tag found.
                            </p>
                            {newTagInput.trim() && (
                              <Button
                                size="sm"
                                onClick={handleCreateNewTag}
                                className="bg-primary hover:bg-primary/90"
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Create "{newTagInput}"
                              </Button>
                            )}
                          </div>
                        </CommandEmpty>
                        
                        <CommandGroup>
                          {/* Select All Option */}
                          <CommandItem
                            onSelect={() => {
                              if (selectedTags.length === availableTags.length) {
                                setSelectedTags([]);
                              } else {
                                setSelectedTags([...availableTags]);
                              }
                            }}
                            className="cursor-pointer"
                          >
                            <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary opacity-50 [&_svg]:invisible">
                              {selectedTags.length === availableTags.length && (
                                <Check className="h-4 w-4 visible" />
                              )}
                            </div>
                            <span>(Select All)</span>
                          </CommandItem>
                          
                          {/* Available Tags */}
                          {availableTags.map((tag) => (
                            <CommandItem
                              key={tag}
                              onSelect={() => handleTagToggle(tag)}
                              className="cursor-pointer"
                            >
                              <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary opacity-50 [&_svg]:invisible">
                                {selectedTags.includes(tag) && (
                                  <Check className="h-4 w-4 visible" />
                                )}
                              </div>
                              <span>{tag}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        
                        {newTagInput.trim() && !availableTags.includes(newTagInput.trim()) && (
                          <>
                            <CommandSeparator />
                            <CommandGroup>
                              <CommandItem
                                onSelect={handleCreateNewTag}
                                className="cursor-pointer"
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                <span>Create "{newTagInput}"</span>
                              </CommandItem>
                            </CommandGroup>
                          </>
                        )}
                        
                        <CommandSeparator />
                        <CommandGroup>
                          <CommandItem
                            onSelect={() => setIsTagDropdownOpen(false)}
                            className="cursor-pointer justify-center"
                          >
                            Close
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Bookmaker Selection */}
              <div className="space-y-2">
                <Label>Bookmaker</Label>
                <Popover open={isBookmakerDropdownOpen} onOpenChange={setIsBookmakerDropdownOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={isBookmakerDropdownOpen}
                      className="w-full justify-between bg-background border-border"
                    >
                      <span className={selectedBookmaker ? "text-foreground" : "text-muted-foreground"}>
                        {selectedBookmaker || "Select bookmaker"}
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent 
                    className="w-[--radix-popover-trigger-width] p-0 bg-popover border-border" 
                    side="top"
                    align="start"
                  >
                    <Command className="bg-popover">
                      <CommandInput 
                        placeholder="Search bookmaker..." 
                        className="h-9"
                      />
                      <CommandList className="max-h-[200px]">
                        <CommandEmpty>
                          <div className="text-center py-6">
                            <p className="text-sm text-muted-foreground">
                              No bookmaker found.
                            </p>
                          </div>
                        </CommandEmpty>
                        
                        <CommandGroup>
                          {availableBookmakers.map((bookmaker) => (
                            <CommandItem
                              key={bookmaker}
                              onSelect={() => {
                                setSelectedBookmaker(bookmaker);
                                setIsBookmakerDropdownOpen(false);
                              }}
                              className="cursor-pointer"
                            >
                              <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary opacity-50 [&_svg]:invisible">
                                {selectedBookmaker === bookmaker && (
                                  <Check className="h-4 w-4 visible" />
                                )}
                              </div>
                              <span>{bookmaker}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        
                        <CommandSeparator />
                        <CommandGroup>
                          <CommandItem
                            onSelect={() => setIsBookmakerDropdownOpen(false)}
                            className="cursor-pointer justify-center"
                          >
                            Close
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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