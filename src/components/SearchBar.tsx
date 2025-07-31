import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-bar__wrapper mx-4 lg:mx-0 w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="search-bar__inner relative flex items-center bg-background border border-border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <span className="block icon mr-3">
            <Search className="h-4 w-4 text-muted-foreground" />
          </span>
          <input
            type="text"
            placeholder="Pesquisar um evento"
            value={query}
            onChange={handleChange}
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;