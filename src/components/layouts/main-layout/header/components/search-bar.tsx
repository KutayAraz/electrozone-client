import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as SearchIcon } from "@assets/svgs/search.svg";

export const SearchBar = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getQueryFromLocation = () => {
    return new URLSearchParams(location.search).get("query") || "";
  };

  const [query, setQuery] = useState(getQueryFromLocation());

  // Update the query state when the location changes
  useEffect(() => {
    setQuery(getQueryFromLocation());
  }, [location]);

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
    <div className={`relative flex ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search Electrozone"
        className={`size-full rounded-md pl-3 pr-10 focus:outline-none focus:ring-1 focus:ring-gray-500`}
      />
      <button onClick={handleSearch} className="absolute inset-y-0 right-0 flex items-center">
        <SearchIcon className="h-full w-auto rounded-md bg-theme-orange p-2 hover:bg-orange-400" />
      </button>
    </div>
  );
};
