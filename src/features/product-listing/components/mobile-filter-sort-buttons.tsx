import { FilterList, Sort } from "@mui/icons-material";

import { useFixedElementVisibility } from "@/hooks/use-fixed-element-visibility";

interface MobileFilterSortButtonsProps {
  onFilterClick: () => void;
  onSortClick: () => void;
}

// Static version - always in document flow
const StaticButtons = ({ onFilterClick, onSortClick }: MobileFilterSortButtonsProps) => (
  <div className="flex w-full sm:hidden border-b border-gray-200 bg-white">
    <button
      className="flex-1 py-2 px-4 bg-white border-r border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150"
      onClick={onFilterClick}
    >
      <FilterList className="w-5 h-5 text-gray-600" />
      <span className="font-medium">Filter</span>
    </button>
    <button
      className="flex-1 py-2 px-4 bg-white flex items-center justify-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150"
      onClick={onSortClick}
    >
      <Sort className="w-5 h-5 text-gray-600" />
      <span className="font-medium">Sort</span>
    </button>
  </div>
);

// Fixed version - appears when scrolling up
const FixedButtons = ({
  onFilterClick,
  onSortClick,
  headerHeight,
}: MobileFilterSortButtonsProps & { headerHeight: number }) => (
  <div
    className="fixed left-0 right-0 z-30 flex w-full sm:hidden animate-slideDown shadow-lg border-b border-gray-200 bg-white"
    style={{ top: `${headerHeight}px` }}
  >
    <button
      className="flex-1 py-2 px-4 bg-white border-r border-b border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150"
      onClick={onFilterClick}
    >
      <FilterList className="w-5 h-5 text-gray-600" />
      <span className="font-medium">Filter</span>
    </button>
    <button
      className="flex-1 py-2 px-4 bg-white border-b border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150"
      onClick={onSortClick}
    >
      <Sort className="w-5 h-5 text-gray-600" />
      <span className="font-medium">Sort</span>
    </button>
  </div>
);

export const MobileFilterSortButtons = ({
  onFilterClick,
  onSortClick,
}: MobileFilterSortButtonsProps) => {
  // Get header height using selector
  const { showFixedElement, elementHeight } = useFixedElementVisibility({
    elementSelector: "[data-header-container]",
    threshold: 400,
  });

  return (
    <>
      <StaticButtons onFilterClick={onFilterClick} onSortClick={onSortClick} />

      {showFixedElement && (
        <FixedButtons
          onFilterClick={onFilterClick}
          onSortClick={onSortClick}
          headerHeight={elementHeight}
        />
      )}
    </>
  );
};
