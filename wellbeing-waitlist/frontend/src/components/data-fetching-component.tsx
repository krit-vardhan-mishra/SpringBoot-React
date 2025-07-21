import React, { useState, useEffect } from 'react';
import LoadingScreen from './loading-screen';
import SkeletonScreen from './skeleton-screen';
import { apiHelpers } from '../api/axios-setup';
import { AxiosError } from 'axios';

const DataFetchingComponent = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      setIsFetching(true);
      try {
        const response = await apiHelpers.get('/your-data-endpoint');
        setData(response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Error fetching data:', apiHelpers.handleError(axiosError));
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  const handleNavigate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Navigation complete');
    }, 2000);
  };

  return (
    <div>
      <LoadingScreen isLoading={isLoading} />

      {isFetching && <SkeletonScreen />}

      {!isFetching && data && (
        <div>
          <h1>Data Fetched Successfully!</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      {!isFetching && !data && (
        <div>
          <p>No data available.</p>
        </div>
      )}

      <button onClick={handleNavigate}>Simulate Navigation</button>
    </div>
  );
};

export default DataFetchingComponent;