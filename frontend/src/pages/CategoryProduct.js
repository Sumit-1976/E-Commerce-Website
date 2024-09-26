import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalCard from '../components/VerticalCard';
import SummaryAPI from '../common';

const CategoryProduct = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);

  const urlCategoryListinArray = urlSearch.getAll('category');

  const initialSelectCategory = urlCategoryListinArray.reduce((acc, el) => {
    acc[el] = true;
    return acc;
  }, {});

  const [selectCategory, setSelectCategory] = useState(initialSelectCategory);
  const [filterCategoryList, setFilterCategoryList] = useState(urlCategoryListinArray);

  const [sortBy, setSortBy] = useState("")

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryAPI.filterProduct.url, {
      method: SummaryAPI.filterProduct.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category: filterCategoryList }),
    });

    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
    setLoading(false);
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  useEffect(() => {
    const selectedCategories = Object.keys(selectCategory)
      .filter((key) => selectCategory[key]);
    setFilterCategoryList(selectedCategories);
  }, [selectCategory]);

  useEffect(() => {
    const queryString = filterCategoryList.map((category) => `category=${category}`).join('&');
    navigate(`/product-category?${queryString}`);
    fetchData();
  }, [filterCategoryList]);

  const handleOnChangeSortBy = (e)=>{
    const {value} = e.target

    setSortBy(value)

    if(value === 'asc'){
      setData(prev => prev.sort((a,b)=>a.sellingPrice - b.sellingPrice))
    }

    if(value === 'dsc'){
      setData(prev => prev.sort((a,b)=>b.sellingPrice - a.sellingPrice))
    }
    
  }

  useEffect(()=>{

  },[sortBy])

  return (
    <div className='container mx-auto p-4'>
      {/* DESKTOP */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>

        {/* LEFT - Filter Sidebar */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>

          {/* SORT */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort By</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"}/>
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"}/>
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {productCategory.map((categoryName, index) => (
                <div className='flex items-center gap-3' key={index}>
                  <input
                    type='checkbox'
                    name={'category'}
                    checked={selectCategory[categoryName.value] || false}
                    value={categoryName?.value}
                    id={categoryName?.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                </div>
              ))}
            </form>
          </div>

        </div>

        {/* RIGHT - Product Display */}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {
              data.length !== 0 && (
                <VerticalCard data={data} loading={loading} />
              )
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export default CategoryProduct;
