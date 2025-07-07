import React, { useState, useEffect } from 'react';
import LoadingScreen from './loading-screen';
import SkeletonScreen from './skeleton-screen';

const DataFetchingComponent = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false); // State for skeleton

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true); // Show skeleton while fetching
      try {
        const response = await fetch('/api/your-data-endpoint'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state here if needed
      } finally {
        setIsFetching(false); // Hide skeleton after fetch (success or failure)
      }
    };

    fetchData();
  }, []);

  // Simulate navigation triggering loading screen (for demonstration)
  const handleNavigate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Perform actual navigation here (e.g., using useNavigate)
      console.log('Navigation complete');
    }, 2000);
  };

  return (
    <div>
      <LoadingScreen isLoading={isLoading} />

      {isFetching && <SkeletonScreen />}

      {!isFetching && data && (
        <div>
          {/* Render your actual data here */}
          <h1>Data Fetched Successfully!</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      {!isFetching && !data && (
        <div>
          {/* Render a message if there's no data and not fetching */}
          <p>No data available.</p>
        </div>
      )}

      {/* Example button that triggers the loading screen */}
      <button onClick={handleNavigate}>Simulate Navigation</button>
    </div>
  );
};

export default DataFetchingComponent;