import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetItemsQuery } from '../pages/dummyAPI';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const Product = () => {
  const { data, error, isLoading } = useGetItemsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'items/itemAdded', payload: data });
  }, [dispatch, data]);
  const { items: dataFromStore } = useSelector(
    (state: RootState) => state.items
  );
  console.log(dataFromStore, '-------Data from store');

  const [pages, setPages] = useState(1);

  //   console.log(data, '-----------Data');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className='h-screen mx-auto'>
      <h1 className='text-3xl font-bold underline'>Product List</h1>
      {dataFromStore &&
        dataFromStore.map((item: any) => (
          <li key={item.id} className='my-4'>
            <div className='flex items-center space-x-4'>
              <p>{item.id}</p>
              <Link
                to={`/products/${item.id}`}
                className='text-blue-500 hover:underline'
              >
                {item.name}
              </Link>
            </div>
            <div className='text-gray-500'>{item.email}</div>
          </li>
        ))}
      <div className='mt-8 flex justify-center items-center'>
        <button
          // onClick={()=> setPages(p=> )}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Previous
        </button>
        <span className='mx-4'>{pages}</span>

        <button className='ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          Next
        </button>
      </div>
      {/* // </div> */}
      {/* )} */}
    </div>
  );
};

export default Product;
