import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "@assets/svg/search.svg";

const SearchBar = ({ className }: { className?: string }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getQueryFromLocation = () => {
    return new URLSearchParams(location.search).get('query') || '';
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
        className={`rounded-md w-full pl-3 pr-10 h-full focus:outline-none focus:ring-1 focus:ring-gray-500`}
      />
      <button
        onClick={handleSearch}
        className="absolute inset-y-0 right-0 flex items-center"
      >
        <SearchIcon className="w-auto h-full bg-theme-orange rounded-md hover:bg-orange-400" />
      </button>
    </div>
  );
};

export default SearchBar;
