import React, { useEffect } from 'react'
import ProductCard from '../components/ProductCard';
import SortBy from '../components/ui/SortBy';
import Search from '../components/ui/Search';
import Context from '../components/Context';
import products from '../data/products';

const HomePage = () => {
  useEffect(() => {
    document.title = "Home Page";
  })

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='w-full flex justify-center mt-10 mb-10'>
        <Context />
      </div>

      <div className='flex flex-wrap justify-between px-6 md:px-28 gap-4 mt-4'>
        <Search />
        <SortBy />
      </div>

      <div className='flex flex-wrap justify-center mt-2'>
        {products.map(product => (
          <ProductCard
            key={product.productId}
            title={product.title}
            subTitle={product.subTitle}
            price={product.price}
            sticker={product.imageUrl} />
        ))}
      </div>
    </div>
  )
}

export default HomePage;