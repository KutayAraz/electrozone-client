import { formatCategoryName } from "@/utils/format-casing";

import { FilterCheckboxList, FilterHeading } from "./FilterOption";

interface SubcategoriesFilterProps {
  subcategoriesData: string[];
  selectedSubcategories: string[];
  handleSubcategoryChange: (subcategory: string) => void;
}

export const SubcategoriesFilter = ({
  subcategoriesData,
  selectedSubcategories,
  handleSubcategoryChange,
}: SubcategoriesFilterProps) => (
  <div>
    <FilterHeading>Subcategories</FilterHeading>

    <FilterCheckboxList
      options={subcategoriesData.map((subcategory) => ({
        value: subcategory,
        label: formatCategoryName(subcategory),
      }))}
      selected={selectedSubcategories}
      onToggle={handleSubcategoryChange}
      getAriaLabel={(label) => `Filter by ${label} subcategory`}
    />
  </div>
);
