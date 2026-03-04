import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetItemsQuery } from '../pages/dummyAPI';
import { useDispatch, useSelector } from 'react-redux';
// import type { RootState } from '../store/store';
import { selectAll } from '../store/slices/itemSlices';

const Product = () => {
  const { data, error, isLoading } = useGetItemsQuery();
  console.log(data, '-----------------------data');
  const dispatch = useDispatch();

  useEffect(() => {
    // Only dispatch if data is not null/undefined
    if (data) {
      dispatch({ type: 'items/itemAdded', payload: data });
    }
  }, [dispatch, data]);
  // const dataFromStore = useSelector((state: RootState) => state.items.items);
  const items = useSelector(selectAll);

  // console.log(dataFromStore, '-------Data from store');
  // const items = (dataFromStore && Object.values(dataFromStore)) || [];
  // const items = (itemsStore && Object.values(itemsStore)) || [];
  // const items = itemsStore || [];

  const [pages, setPages] = useState(1);

  //   console.log(data, '-----------Data');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className='h-screen mx-auto'>
      <h1 className='text-3xl font-bold underline'>Product List</h1>
      {items &&
        items.map((item: any) => (
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
