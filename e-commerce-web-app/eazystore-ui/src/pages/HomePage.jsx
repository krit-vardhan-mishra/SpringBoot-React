import React, { useEffect, useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import SortBy from '../components/ui/SortBy';
import Search from '../components/ui/Search';
import Context from '../components/Context';
import apiClient from '../api/apiClient';
import AnimatedError from '../animation/AnimatedError';
import AnimatedLoading from '../animation/AnimatedLoading';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sorting, setSorting] = useState("popularity");
  const [searching, setSearching] = useState('');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    document.title = "Home";
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get("/products/");
      setProducts(response.data);
    } catch (error) {
      setError(error.message || "Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    if (sorting === "popularity") {
      sorted.sort((a, b) => b.popularity - a.popularity);
    } else if (sorting === "priceLowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sorting === "priceHighToLow") {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [products, sorting]);

  const filteredProducts = useMemo(() => {
    const lowerSearch = searching.toLowerCase();
    const filtered = sortedProducts.filter(product =>
      product.name?.toLowerCase().includes(lowerSearch) ||
      product.subTitle?.toLowerCase().includes(lowerSearch)
    );

    let limit = 3;
    if (screenWidth < 820) {
      limit = 1;
    } else if (screenWidth < 1100) {
      limit = 2;
    }

    return filtered;
  }, [sortedProducts, searching, screenWidth]);

  if (loading) return <AnimatedLoading />;
  if (error) return <AnimatedError error={error} />;

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

        <div className='grid grid-cols-1 max-[800px]:grid-cols-1 max-[1100px]:grid-cols-2 min-[1100px]:grid-cols-3 gap-4 sm:gap-6 justify-items-center'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard
                key={product.productId}
                title={product.name}
                subTitle={product.subTitle}
                price={product.price}
                sticker={`/stickers/${product.imageUrl}`}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-red-600 font-bold text-lg mt-10">
              No Products Available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;