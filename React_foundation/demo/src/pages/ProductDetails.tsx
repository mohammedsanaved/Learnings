import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// import { useGetItemByIdQuery } from '../pages/dummyAPI';

const ProductDetails = () => {
  const { id } = useParams();
  const item = useSelector((state: any) =>
    state.items.items.find((itm: any) => itm.id === Number(id))
  );
  console.log(item, '------------item');
  //   const { data, error, isLoading } = useGetItemByIdQuery(id);

  //   if (isLoading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1 className='text-3xl font-bold underline'>Product Details</h1>
      <p>ID: {id}</p>
      <p>Name: {item.name}</p>
      <p>Email: {item.email}</p>
    </div>
  );
};
export default ProductDetails;
