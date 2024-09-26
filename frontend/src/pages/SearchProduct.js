import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryAPI from '../common';
import VerticalCard from '../components/VerticalCard';

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null); 
    try {
      const response = await fetch(SummaryAPI.searchProduct.url + query.search);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const dataResponse = await response.json();
      setData(dataResponse.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <div className='container mx-auto p-4'>
      {loading && <p className='text-lg text-center'>Loading...</p>}

      {!loading && error && <p className='text-red-500 text-center'>{error}</p>}

      <p className='text-lg font-semibold my-3'>Search Results: {data.length}</p>

      {!loading && data.length === 0 && !error && (
        <p className='bg-white text-lg text-center p-4'>No Data Found...</p>
      )}

      {!loading && data.length !== 0 && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;
