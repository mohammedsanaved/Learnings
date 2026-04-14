'use client';

import { useEffect, useState } from 'react';

export default function CSRPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const result = await res.json();

      setData(result);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <p className='p-6'>Loading...</p>;

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold'>CSR Page</h1>

      {data.slice(0, 5).map((post) => (
        <div key={post.id} className='border p-3 my-2'>
          {post.title}
        </div>
      ))}
    </div>
  );
}
