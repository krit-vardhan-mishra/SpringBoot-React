import React from 'react';
import { cn } from "../../lib/utils";

const SortBy = ({ value, onChange }) => {
  return (
    <div className="sort-by-selector flex items-center gap-2 text-[#4c1eab] dark:text-[#D3CEFB]">
      <label htmlFor="sort-by" className="text-base font-medium">Sort by</label>
      <select
        id="sort-by"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "rounded-md border-2 p-2 px-1 py-1",
          "bg-[#F0F3F2] border-[#4c1eab] text-black",
          "dark:bg-[#383d42] dark:border-[#2d2d2d] dark:text-white"
        )}
      >
        <option className="bg-white dark:bg-[#383e45]" value="popularity">
          Popularity
        </option>
        <option className="bg-white dark:bg-[#383e45]" value="priceLowToHigh">
          Price Low to High
        </option>
        <option className="bg-white dark:bg-[#383e45]" value="priceHighToLow">
          Price High to Low
        </option>
      </select>
    </div>
  );
};

export default React.memo(SortBy);