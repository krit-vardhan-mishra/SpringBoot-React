import React from 'react';
import { cn } from "../../lib/utils";

const SortBy = ({ value, onChange }) => {
  return (
    <div className="sort-by-selector flex items-center gap-2">
      <label htmlFor="sort-by" className='text-[#4c1eab] text-base font-medium'>Sort by</label>
      <select id="sort-by" value={value} onChange={onChange} className={cn(
              "rounded-md border-2 p-2 px-1 py-1 border-[#4c1eab]")}>        
        <option value="popularity">Popularity</option>
        <option value="priceLowToHigh">Price Low to High</option>
        <option value="priceHighToLow">Price High to Low</option>
      </select>
    </div>
  );
};

export default SortBy;