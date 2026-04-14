async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store', // 👈 THIS MAKES IT SSR
  });

  return res.json();
}
import EmployeeClient from './EmployeeClient';

export default async function EmployeePage() {
  const data = await getData();
  console.log(data);

  if (!data) return <p>Loading...</p>;

  if (data.length === 0) return <p>No data found</p>;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold'>Employee Page</h1>
      <EmployeeClient data={data} />
    </div>
  );
}
