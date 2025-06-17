interface MobileFilterSortButtonsProps {
  onFilterClick: () => void;
  onSortClick: () => void;
}

export const MobileFilterSortButtons = ({
  onFilterClick,
  onSortClick,
}: MobileFilterSortButtonsProps) => {
  return (
    <div className="flex w-full justify-between px-2 py-2 sm:hidden">
      <button
        className="flex-1 mr-1 py-2 px-4 bg-gray-100 rounded flex items-center justify-center"
        onClick={onFilterClick}
      >
        <span>Filter</span>
      </button>
      <button
        className="flex-1 ml-1 py-2 px-4 bg-gray-100 rounded flex items-center justify-center"
        onClick={onSortClick}
      >
        <span>Sort</span>
      </button>
    </div>
  );
};
