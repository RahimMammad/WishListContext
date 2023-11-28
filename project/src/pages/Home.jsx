import React, { useState } from 'react';
import Products from '../components/Products';
import useDarkMode from '../hooks/useDarkTheme';
import DarkTheme from '../../public/DarkTheme.svg';
import FilterComponent from '../components/Filter';
import useFetchData from '../hooks/useFetchData';

const Home = () => {
  const [darkmode, changeDarkTheme] = useDarkMode();
  const [appliedFilters, setAppliedFilters] = useState([]);
  const { data, isLoading, error } = useFetchData(appliedFilters);

  const handleFilterChange = (filters) => {
    setAppliedFilters(filters);
  };

  return (
    <>
      <div className={`w-8 p-1 h-8 absolute top-20 right-20 rounded-md transition duration-300 ${darkmode ? 'bg-white' : ''}`}>
        <img
          onClick={changeDarkTheme}
          src={DarkTheme}
          alt=""
          className={`w-full h-full ${darkmode ? 'filter-invert' : ''} transition duration-300`}
        />
      </div>
      <FilterComponent onFilterChange={handleFilterChange} className={`transition duration-300 ${darkmode ? 'dark' : ''}`} />
      <Products data={data} isLoading={isLoading} error={error} className={`transition duration-300 ${darkmode ? 'dark' : ''}`} />
    </>
  );
};

export default Home;