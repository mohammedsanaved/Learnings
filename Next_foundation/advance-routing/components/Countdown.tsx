// app/components/Countdown.tsx
'use client'; // 👈 Marks this as a client component for interactivity

import { useEffect, useState } from 'react';

export default function Countdown() {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 1 ? prev - 1 : 10)); // Reset to 10 when it hits 1
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-blue-50 border border-blue-200 p-4 rounded-md my-4'>
      <p className='text-sm text-blue-700'>
        ⏱️ Cache status:{' '}
        <span className='font-bold'>
          {seconds > 0
            ? `Fresh for ${seconds}s`
            : 'Stale! Next refresh updates data.'}
        </span>
      </p>
      <div className='w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden'>
        <div
          className='bg-blue-600 h-full transition-all duration-1000 ease-linear'
          style={{ width: `${(seconds / 10) * 100}%` }}
        />
      </div>
    </div>
  );
}
