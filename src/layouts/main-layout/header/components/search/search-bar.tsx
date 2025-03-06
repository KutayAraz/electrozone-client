import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as SearchIcon } from "@assets/svgs/search.svg";

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

  const getQueryFromLocation = useCallback(() => {
    return new URLSearchParams(location.search).get("query") || "";
  }, [location]);

  const [query, setQuery] = useState(getQueryFromLocation());

  // Update the query state when the location changes
  useEffect(() => {
    setQuery(getQueryFromLocation());
  }, [location, getQueryFromLocation]);

  const handleSearch = () => {
    if (query) {
      navigate(`/search?query=${query}`);
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
        className="size-full rounded-md pl-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-orange focus:ring-offset-2"
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
