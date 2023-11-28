  import React, { useMemo, useState, useEffect } from 'react';
  import './index.scss';
  import useFetchData from '../../hooks/useFetchData';
  import Cart from '../ProductCart';

  const Products = ({appliedFilters}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [sortedData, setSortedData] = useState([]);
    const [sortAsc, setSortAsc] = useState(true);
    const [sortOption, setSortOption] = useState('Name');
    const [isGridLayout, setIsGridLayout] = useState(true);

    const { data, isLoading, error } = useFetchData();

    const sortData = () => {
      let filteredData = [...data];
    
      if (appliedFilters && appliedFilters.length > 0) {
        appliedFilters.forEach((filter) => {
          filteredData = filteredData.filter((product) => product[filter.label] === filter.value);
        });
      }
    
      filteredData.sort((a, b) => {
        if (!a || !b) return 0;
    
        if (sortOption === 'Name') {
          return (sortAsc ? 1 : -1) * (a.name || '').localeCompare(b.name || '');
        }
    
        if (sortOption === 'Low to High' && a.price !== undefined && b.price !== undefined) {
          return (sortAsc ? 1 : -1) * (a.price - b.price);
        }
    
        if (sortOption === 'High to Low' && a.price !== undefined && b.price !== undefined) {
          return (sortAsc ? -1 : 1) * (a.price - b.price);
        }
    
        return 0;
      });
    
      setSortedData(filteredData);
    };
    
    

    useEffect(() => {
      if (data && data.length > 0) {
        setSortedData(data);
      }
    }, [data]);

    useEffect(() => {
      sortData();
    }, [sortAsc, sortOption, appliedFilters, data]);

    const handleSort = (e) => {
      setSortOption(e.target.value);
      setSortAsc(!sortAsc);
      setCurrentPage(1);
    };

    const handleLayoutChange = () => {
      setIsGridLayout(!isGridLayout);
    
      const productMainContainer = document.querySelector('.product-main-container');
      if (productMainContainer) {
        productMainContainer.classList.toggle('layout-2', isGridLayout);
      }
    };

    const pageNumbers = useMemo(() => {
      if (!sortedData || sortedData.length === 0) return [];
      return Array.from({ length: Math.ceil(sortedData.length / itemsPerPage) }, (_, index) => index + 1);
    }, [sortedData, itemsPerPage]);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const currentItems = useMemo(() => {
      if (!sortedData || sortedData.length === 0) return [];
      return sortedData.slice(firstIndex, lastIndex);
    }, [sortedData, currentPage, itemsPerPage, firstIndex, lastIndex]);

    const handlePageClick = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    return (
      <div style={{ width: '70%', padding: '50px', position: 'absolute', right: '30px', top: '200px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius: '8px' }}>
        <div className='flex justify-end gap-3 items-center'>
          <span>Sort by: </span>
          <select className='border border-solid rounded-sm' onChange={handleSort} value={sortOption}>
            <option value='Name'>Name</option>
            <option value='Low to High'>Low to High Price</option>
            <option value='High to Low'>High to Low Price</option>
          </select>
          <a href="#" className={`btn-layout ${isGridLayout ? 'active' : ''}`} onClick={() => handleLayoutChange('repeat(3, 100px) repeat(1, 200px)', '1fr 2fr')}>
            <svg width="16" height="10"><rect x="0" y="0" width="4" height="4"></rect><rect x="6" y="0" width="4" height="4"></rect><rect x="12" y="0" width="4" height="4"></rect><rect x="0" y="6" width="4" height="4"></rect><rect x="6" y="6" width="4" height="4"></rect><rect x="12" y="6" width="4" height="4"></rect></svg>
          </a>
          <a href="#" className={`btn-layout ${!isGridLayout ? 'active' : ''}`} onClick={() => handleLayoutChange('repeat(2, 150px) repeat(2, 150px)', '1fr 1fr')}>
            <svg width="10" height="10"><rect x="0" y="0" width="4" height="4"></rect><rect x="6" y="0" width="4" height="4"></rect><rect x="0" y="6" width="4" height="4"></rect><rect x="6" y="6" width="4" height="4"></rect></svg>
          </a>
        </div>
        <div className='product-main-container'>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            currentItems.map((product) => (
              <Cart key={product.id} product={product} />
            ))
          )}
          <div style={{maxWidth: "100%", margin: '20px auto', display: 'flex', justifyContent: 'center' }} className='pagination'>
            {pageNumbers.map((number) => (
              <button style={{ width: '30px', height: '30px', border: 'none', cursor: 'pointer', background: currentPage === number ? '#333' : 'transparent', color: currentPage === number ? '#fff' : '#333', }} key={number} onClick={() => handlePageClick(number)}>
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default Products;
