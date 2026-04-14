async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-store', // 👈 THIS MAKES IT SSR
  });

  return res.json();
}

export default async function SSRPage() {
  const data = await getData();

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold'>SSR Page</h1>

      {data.slice(0, 5).map((post: any) => (
        <div key={post.id} className='border p-3 my-2'>
          {post.title}
        </div>
      ))}
    </div>
  );
}
