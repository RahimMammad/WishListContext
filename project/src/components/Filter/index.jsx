// FilterComponent.jsx
import React, { useEffect, useState } from 'react';
import Arrow from '../../../public/FilterArrow.svg';
import useFetchData from '../../hooks/useFetchData';
import './index.scss';

const FilterComponent = ({ onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isColorOpen, setIsColorOpen] = useState(true);
  const [isSizeOpen, setIsSizeOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  const [data, setData] = useState([]); 

  const { fetchData, isLoading, error, setFilters  } = useFetchData();

  useEffect(() => {
    setFilters([]);
  }, []);

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const result = await fetchData(); 
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAndSetState();
  }, []);

  useEffect(() => {
    setFilters({ category: selectedCategories, color: selectedColor, size: selectedSize, brand: selectedBrand });
  }, [selectedCategories, selectedColor, selectedSize, selectedBrand]);
  
  const applyCategoryFilter = (category) => {
    if (selectedCategories.includes(category)) {
        setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
        setSelectedCategories([...selectedCategories, category]);
    }
};

const applyColorFilter = (color) => {
    if (selectedColor.includes(color)) {
        setSelectedColor(selectedColor.filter((co) => co !== color));
    } else {
        setSelectedColor([...selectedColor, color]);
    }
};

const applySizeFilter = (size) => {
    if (selectedSize.includes(size)) {
        setSelectedSize(selectedSize.filter((s) => s !== size));
    } else {
        setSelectedSize([...selectedSize, size]);
    }
};
const applyBrandFilter = (brand) => {
    if (selectedBrand.includes(brand)) {
        setSelectedBrand(selectedBrand.filter((b) => b !== brand))
    }
    else {
        setSelectedBrand([...selectedBrand, brand])
    }
}

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedColor([]);
    setSelectedSize([]);
    setSelectedBrand([])
  };

  const filteredData = data.filter(
    (item) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(item.category)) &&
      (selectedColor.length === 0 || selectedColor.includes(item.color)) &&
      (selectedSize.length === 0 || selectedSize.includes(item.size)) &&
      (selectedBrand.length === 0 || selectedBrand.includes(item.brand))
  );
  
  console.log('Filtered Data:', filteredData);
  

  return (
      <div className='filter-main'>
        <div className="filtersside">
                <div className="filter">
                    <p>Filters</p>
                    <span onClick={clearAllFilters}>Clear All</span>
                </div>
                <div className="category">
                    <h2 onClick={() => setIsCategoryOpen(!isCategoryOpen)}>Category</h2>
                    {isCategoryOpen && (
                        <>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="SweatShirt"
                                        checked={selectedCategories.includes("SweatShirt")}
                                        onChange={() => applyCategoryFilter("SweatShirt")}
                                    />
                                    SweatShirt
                                </div>
                            </label>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="Jeans"
                                        checked={selectedCategories.includes("Jeans")}
                                        onChange={() => applyCategoryFilter("Jeans")}
                                    />
                                    Jeans
                                </div>
                            </label>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="T-Shirt"
                                        checked={selectedCategories.includes("T-Shirt")}
                                        onChange={() => applyCategoryFilter("T-Shirt")}
                                    />
                                    T-Shirt
                                </div>
                            </label>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="Sneaker"
                                        checked={selectedCategories.includes("Sneaker")}
                                        onChange={() => applyCategoryFilter("Sneaker")}
                                    />
                                    Sneaker
                                </div>
                            </label>
                        </>
                    )}
                </div>
                <div>
                    <h2 className="colortext" onClick={() => setIsColorOpen(!isColorOpen)}>Color</h2>
                    {isColorOpen && (
                        <>
                            <div className="colors">
                                <input
                                    className="brown"
                                    type="checkbox"
                                    value="Brown"
                                    checked={selectedColor.includes("Brown")}
                                    onChange={() => applyColorFilter("Brown")}
                                />

                                <input
                                    className="black"
                                    type="checkbox"
                                    value="Black"
                                    checked={selectedColor.includes("Black")}
                                    onChange={() => applyColorFilter("Black")}
                                />
                                <input
                                    className="White"
                                    type="checkbox"
                                    value="White"
                                    checked={selectedColor.includes("White")}
                                    onChange={() => applyColorFilter("White")}
                                />
                                <input
                                    className="blue"
                                    type="checkbox"
                                    value="Blue"
                                    checked={selectedColor.includes("Blue")}
                                    onChange={() => applyColorFilter("Blue")}
                                />
                                <input
                                    className="khaki"
                                    type="checkbox"
                                    value="Khaki"
                                    checked={selectedColor.includes("Khaki")}
                                    onChange={() => applyColorFilter("Khaki")}
                                />
                                <input
                                    className="Gray"
                                    type="checkbox"
                                    value="Gray"
                                    checked={selectedColor.includes("Gray")}
                                    onChange={() => applyColorFilter("Gray")}
                                />
                                <input
                                    className="orange"
                                    type="checkbox"
                                    value="Orange"
                                    checked={selectedColor.includes("Orange")}
                                    onChange={() => applyColorFilter("Orange")}
                                />
                            </div>
                        </>
                    )}
                </div>
                <div className="sizes">
                    <h2 onClick={() => setIsSizeOpen(!isSizeOpen)}>Size</h2>
                    {isSizeOpen && (
                        <>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="Xs"
                                        checked={selectedSize.includes("Xs")}
                                        onChange={() => applySizeFilter("Xs")}
                                    />
                                    XS
                                </div>
                            </label>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="S"
                                        checked={selectedSize.includes("S")}
                                        onChange={() => applySizeFilter("S")}
                                    />
                                    S
                                </div>
                            </label>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="M"
                                        checked={selectedSize.includes("M")}
                                        onChange={() => applySizeFilter("M")}
                                    />
                                    M
                                </div>
                            </label>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="L"
                                        checked={selectedSize.includes("L")}
                                        onChange={() => applySizeFilter("L")}
                                    />
                                    L
                                </div>
                            </label>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="XL"
                                        checked={selectedSize.includes("XL")}
                                        onChange={() => applySizeFilter("XL")}
                                    />
                                    XL
                                </div>
                            </label>
                        </>
                    )}
                </div>
                <div>
                    <h2 onClick={() => setIsBrandOpen(!isBrandOpen)}>Brand</h2>
                    {isBrandOpen && (
                        <>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="Tommy Hilfiger"
                                        checked={selectedBrand.includes("Tommy Hilfiger")}
                                        onChange={() => applyBrandFilter("Tommy Hilfiger")}
                                    />
                                    Tommy Hilfiger
                                </div>
                            </label>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="Nike"
                                        checked={selectedBrand.includes("Nike")}
                                        onChange={() => applyBrandFilter("Nike")}
                                    />
                                    Nike
                                </div>
                            </label>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="Puma"
                                        checked={selectedBrand.includes("Puma")}
                                        onChange={() => applyBrandFilter("Puma")}
                                    />
                                    Puma
                                </div>
                            </label>
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value="Levi's"
                                        checked={selectedBrand.includes("Levi's")}
                                        onChange={() => applyBrandFilter("Levi's")}
                                    />
                                    Levi's
                                </div>
                            </label>
                        </>
                    )}
                </div>
                <h2 onClick={() => setIsPriceOpen(!isPriceOpen)}>Price</h2>
            </div>  
      </div>
  );
};

export default FilterComponent;
