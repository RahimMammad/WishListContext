// useFetchData.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products', {
          params: { filters }, 
        });

        setData(response.data);
      } catch (error) {
        setError('An error occurred while fetching the data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filters]); 

  return { data, isLoading, error, setFilters }; 
};

export default useFetchData;
