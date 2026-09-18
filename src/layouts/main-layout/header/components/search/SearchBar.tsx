import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import SearchIcon from "@assets/svgs/search.svg?react";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  style?: React.CSSProperties;
}

export const SearchBar = ({
  className,
  placeholder = "Search Electrozone",
  style,
}: SearchBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const urlQuery = new URLSearchParams(location.search).get("query") || "";

  const [query, setQuery] = useState(urlQuery);
  const [lastLocationKey, setLastLocationKey] = useState(location.key);

  // Reset the input on every navigation
  if (location.key !== lastLocationKey) {
    setLastLocationKey(location.key);
    setQuery(urlQuery);
  }

  const handleSearch = () => {
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`relative flex ${className}`} style={style}>
      <label htmlFor="search-input" className="sr-only">
        Search
      </label>
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={placeholder}
        className="size-full bg-white rounded-md pl-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-orange focus:ring-offset-2"
        autoComplete="off"
      />

      <button
        onClick={handleSearch}
        className="absolute inset-y-0 right-0 flex items-center"
        aria-label="Submit search"
      >
        <SearchIcon className="h-full w-auto rounded-md bg-theme-orange p-2 hover:bg-orange-400" />
      </button>
    </div>
  );
};
