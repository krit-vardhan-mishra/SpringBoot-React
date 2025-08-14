import React, { memo } from 'react'; 
import Input from '../ui/Input';

const Search = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2 text-[#4c1eab] dark:text-[#D3CEFB]">
      <span className="text-base font-medium">Search</span>
      <Input
        id="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="border-2"
      />
    </div>
  );
};

export default memo(Search);