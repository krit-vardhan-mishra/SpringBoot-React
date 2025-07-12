import React from 'react'
import Input from '../ui/Input';
import { useTheme } from '../../context/ThemeContext';

const Search = ({ value, onChange }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`flex items-center gap-2 ${isDarkMode? 'text-[#D3CEFB]' : 'text-[#4c1eab]'}`}>
      <span className='text-base font-medium'>Search
      </span>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className={`border-2 ${isDarkMode? 'bg-[#383e45]' : 'bg-[#F0F3F2] border-[#4c1eab]'} `} />
    </div>
  )
}

export default Search;