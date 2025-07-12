import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import SortBy from '../components/ui/SortBy';
import Search from '../components/ui/Search';
import Context from '../components/Context';
import products from '../data/products';

const HomePage = () => {
  const [sorting, setSorting] = useState("popularity");
  const sortedProducts = [...products]
  const [searching, setSearching] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(sortedProducts);

  useEffect(() => {
    document.title = "Home";
  }, [])

  if (sorting === "popularity") {
    sortedProducts.sort((a, b) => b.popularity - a.popularity);
  } else if (sorting === "priceLowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sorting === "priceHighToLow") {
    sortedProducts.sort((a, b) => b.price - a.price)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      const lowerSearch = searching.toLowerCase();
      const filtered = sortedProducts.filter(product =>
        product.title.toLowerCase().includes(lowerSearch) || product.subTitle.toLowerCase().includes(lowerSearch)
      );
      setFilteredProducts(filtered);
    }, 100);
    return () => clearTimeout(timeout);
  }, [searching, sortedProducts]);

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8'>
        <div className='w-full flex justify-center mt-10 sm:mt-16 lg:mt-20 mb-10 sm:mb-16 lg:mb-20'>
          <Context />
        </div>

        <div className='flex flex-col sm:flex-row sm:justify-between items-center sm:items-center gap-4 mb-6 sm:pl-20 sm:pr-25'>
          <Search value={searching} onChange={setSearching} />
          <SortBy value={sorting} onChange={setSorting} />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center'>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.productId}
              title={product.title}
              subTitle={product.subTitle}
              price={product.price}
              sticker={product.imageUrl} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage;