const SearchBar = ({ className }: { className?: string }) => {
  return (
    <input
      type="text"
      placeholder="Search Electrozone"
      className={`${className} rounded-md`}
    />
  );
};

export default SearchBar;
