'use client';

import { debounce } from '@/utils/useDebounce';
import { useState } from 'react';

interface EmployeePageProps {
  name: string;
  username: string;
  email: string;
  id: number;
}
interface EmployeeClientProps {
  data: EmployeePageProps[];
}

const EmployeeClient = ({ data }: EmployeeClientProps) => {
  const [search, setSearch] = useState('');

  const filteredData = data.filter((user: EmployeePageProps) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const debouncedSearch = debounce((value: string) => {
    setSearch(value);
  }, 300);

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold'>Employee Page</h1>

      <input
        type='text'
        value={search}
        onChange={(e) => debouncedSearch(e.target.value)}
        className='border p-2 my-3'
        placeholder='Search by name...'
      />

      {filteredData.map((user: EmployeePageProps) => (
        <div key={user.id} className='border p-3 my-2'>
          {user.name} - {user.email} - @{user.username}
        </div>
      ))}
    </div>
  );
};

export default EmployeeClient;
