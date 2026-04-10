// // import { count } from 'console';
// // import { count } from 'console';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   const [counter, setCounter] = useState<number>(0);

//   useEffect(() => {
//     console.log('Home component mounted');
//     const id = setInterval(() => {
//       console.log('Interval running', counter);
//     }, 1000);

//     return () => {
//       console.log('Home component unmounted');
//       clearInterval(id);
//     };
//   }, [counter]);
//   return (
//     <div className='h-screen flex justify-center items-center flex-col gap-4'>
//       <h1 className='text-4xl font-bold'>Home</h1>
//       <p className='text-xl font-medium'>List All the POSt here</p>
//       <p>Example of Stale Clousers</p>
//       <div>
//         <Link
//           className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
//           to='/gallery'
//         >
//           Gallery
//         </Link>
//       </div>
//       <div>
//         <h3>Counter: {counter}</h3>
//         <div>
//           <button
//             className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2'
//             onClick={() => setCounter((prev) => prev + 1)}
//           >
//             Increment
//           </button>
//           <button
//             className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
//             onClick={() => setCounter((prev) => prev - 1)}
//           >
//             Decrement
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  async function fetchUsers() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const usersData = await response.json();
      setUsers(usersData);
      // console.log(users);
      return usersData;
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(users);
  return (
    <>
      <h1 className='p-4 text-4xl font-bold'>Home</h1>
      <div className='h-screen flex justify-center items-center flex-wrap gap-4'>
        {/* {} */}
        {users.map((user) => (
          <div className='flex flex-wrap gap-4' key={user.id}>
            <div key={user.id} className='border p-4 rounded-lg shadow-md mb-4'>
              <p>
                <span className='font-semibold'>Id:</span> {user.id}
              </p>
              <h2 className='text-2xl font-semibold'>{user.name}</h2>
              <p className='text-lg'>
                <span className='font-semibold'>Email:</span> {user.email}
              </p>
              <p className='text-lg'>
                <span className='font-semibold'>Username:</span> {user.username}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
