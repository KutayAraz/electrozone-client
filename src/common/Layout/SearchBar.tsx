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
    <div className="flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Electrozone"
        className={`${className} rounded-md w-full`}
      />
      <button onClick={handleSearch} className="">Search</button>
    </div>
  );
};

export default SearchBar;
