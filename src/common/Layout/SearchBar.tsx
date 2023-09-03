import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ className }: { className?: string }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query) {
      navigate(`/search?query=${query}`);
    }
  };
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Electrozone"
        className={`${className} rounded-md`}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
