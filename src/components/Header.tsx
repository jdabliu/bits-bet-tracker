import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleBetClick = () => {
    navigate('/');
  };

  return (
    <header className="bg-background border-b border-border px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-primary">BITS</h1>
          <nav className="flex items-center space-x-6">
            <a href="#" className="text-muted-foreground hover:text-foreground">minhas apostas</a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="default" 
            className="bg-primary hover:bg-primary/90"
            onClick={handleBetClick}
          >
            Bet
          </Button>
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-sm">👤</span>
          </div>
          <div className="w-6 h-4 bg-warning rounded-sm"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;