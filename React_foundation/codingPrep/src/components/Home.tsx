// import { count } from 'console';
// import { count } from 'console';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    console.log('Home component mounted');
    const id = setInterval(() => {
      console.log('Interval running', counter);
    }, 1000);

    return () => {
      console.log('Home component unmounted');
      clearInterval(id);
    };
  }, [counter]);
  return (
    <div className='h-screen flex justify-center items-center flex-col gap-4'>
      <h1 className='text-4xl font-bold'>Home</h1>
      <p className='text-xl font-medium'>List All the POSt here</p>
      <p>Example of Stale Clousers</p>
      <div>
        <Link
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          to='/gallery'
        >
          Gallery
        </Link>
      </div>
      <div>
        <h3>Counter: {counter}</h3>
        <div>
          <button
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2'
            onClick={() => setCounter((prev) => prev + 1)}
          >
            Increment
          </button>
          <button
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => setCounter((prev) => prev - 1)}
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
