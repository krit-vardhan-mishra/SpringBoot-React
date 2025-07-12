import React from 'react';
import { cn } from "../../lib/utils";
import { useTheme } from '../../context/ThemeContext';

const SortBy = ({ value, onChange }) => {
  const { isDarkMode } = useTheme()
  return (
    <div className={`sort-by-selector flex items-center gap-2 ${isDarkMode? 'text-[#D3CEFB]' : 'text-[#4c1eab]' }`}>
      <label htmlFor="sort-by" className='text-base font-medium'>Sort by</label>
      <select id="sort-by" value={value} onChange={(e) => onChange(e.target.value)} className={cn(
              `rounded-md border-2 p-2 px-1 py-1 ${isDarkMode? 'bg-[#383d42]' : 'bg-[#F0F3F2] border-[#4c1eab]'}`)}>        
        <option className={`${isDarkMode? 'bg-[#383e45]' : 'bg-[#fff]'}`} value="popularity">Popularity</option>
        <option className={`${isDarkMode? 'bg-[#383e45]' : 'bg-[#fff]'}`} value="priceLowToHigh">Price Low to High</option>
        <option className={`${isDarkMode? 'bg-[#383e45]' : 'bg-[#fff]'}`} value="priceHighToLow">Price High to Low</option>
      </select>
    </div>
  );
};

export default SortBy;