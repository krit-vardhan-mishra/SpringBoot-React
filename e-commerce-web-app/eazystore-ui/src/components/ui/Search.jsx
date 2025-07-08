import React from 'react'
import Input from '../ui/Input';

const Search = () => {
  return (
    <div className='flex items-center gap-2'>
      <span className='text-[#4c1eab] text-base font-medium'>Search
      </span>
      <Input
        placeholder="Search products..."
        className="border-2 border-[#4c1eab]"/>
    </div>
  )
}

export default Search;