// async function getData() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
//     next: { revalidate: 10 }, // 👈 Revalidate every 10 seconds
//   });

//   return res.json();
// }

// export default async function ISRPage() {
//   const data = await getData();

//   return (
//     <div className='p-6'>
//       <h1 className='text-2xl font-bold'>ISR Page</h1>
//       <p>Revalidate every 10 seconds</p>

//       {data.slice(0, 5).map((post: any) => (
//         <div key={post.id} className='border p-3 my-2'>
//           {post.title}
//         </div>
//       ))}
//     </div>
//   );
// }
// app/page.tsx
import Countdown from '../../components/Countdown';

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { revalidate: 10 }, // 👈 Revalidate every 10 seconds
  });

  return res.json();
}

export default async function ISRPage() {
  const data = await getData();
  // Capture the exact time Next.js generated this chunk of HTML
  const renderedAt = new Date().toLocaleTimeString();

  return (
    <div className='p-6 max-w-xl mx-auto'>
      <h1 className='text-2xl font-bold'>
        Incremental Static Regeneration (ISR)
      </h1>
      <p className='text-gray-600'>Data is cached for 10 seconds.</p>

      {/* 1. Show the interviewer the exact generation timestamp */}
      <div className='bg-gray-100 p-3 rounded my-2 text-sm'>
        <strong>HTML Generated At:</strong> {renderedAt}
      </div>

      {/* 2. Inject the live visual countdown */}
      <Countdown />

      <h2 className='text-lg font-semibold mt-6'>Data:</h2>
      {data.slice(0, 5).map((post: any) => (
        <div
          key={post.id}
          className='border p-3 my-2 rounded shadow-sm bg-white'
        >
          <h3 className='font-medium text-gray-800 capitalize'>{post.title}</h3>
        </div>
      ))}
    </div>
  );
}
