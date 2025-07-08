import React from 'react'
import { Button } from "./ui/Button"

const ProductCard = ({sticker, title, subTitle, price}) => {
  return (
    <div className='rounded-md h-auto w-55 m-3 shadow-md overflow-hidden hover:border-2 hover:border-black dark:hover:border-white transition-transform ease-in duration-500'>
      <div className='overflow-hidden h-60 bg-gray-400'>
        <img 
        className='w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105' 
        src={sticker} 
        alt='Sticker'/>
      </div>
      <p className='ps-2 pt-2 text-base font-semibold'>{title || 'Title'}</p>
      <p className='ps-2 text-sm'>{subTitle || 'Sub-Title'}</p>
      <div className="flex justify-between items-center p-2 gap-2 mt-8 mb-2">
        <Button className='text-[#7146c0] bg-[#f2f1fc]'>${price ?? 0}</Button>
        <Button className='bg-[#4c1eab] text-white'>Add to Cart</Button>
      </div>
    </div>
  )
}

export default ProductCard;