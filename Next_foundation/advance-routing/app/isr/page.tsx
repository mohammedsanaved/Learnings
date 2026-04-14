async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { revalidate: 10 }, // 👈 Revalidate every 10 seconds
  });

  return res.json();
}

export default async function ISRPage() {
  const data = await getData();

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold'>ISR Page</h1>
      <p>Revalidate every 10 seconds</p>

      {data.slice(0, 5).map((post: any) => (
        <div key={post.id} className='border p-3 my-2'>
          {post.title}
        </div>
      ))}
    </div>
  );
}
