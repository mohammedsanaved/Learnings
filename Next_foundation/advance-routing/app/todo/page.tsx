// components/TodoList.tsx
'use client';

import { useState } from 'react';
import { useTodoStore } from '@/store/useTodoStore';

export default function TodoList() {
  const [input, setInput] = useState('');
  const { todos, addTodo } = useTodoStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const currentInput = input;
    setInput(''); // Clear input instantly for snappy UX
    await addTodo(currentInput);
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-white/80 rounded-xl shadow-md border border-gray-100'>
      <h2 className='text-xl font-bold text-gray-800 mb-4'>
        Zustand Optimistic Todos
      </h2>

      {/* Todo Form */}
      <form onSubmit={handleSubmit} className='flex gap-2 mb-6'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Add a new todo...'
          className='flex-1 px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          type='submit'
          className='px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition'
        >
          Add
        </button>
      </form>

      {/* Interviewer Demo Helper Notice */}
      <p className='text-xs text-gray-500 mb-4 bg-amber-50 p-2 rounded border border-amber-200'>
        💡 <strong>Demo tip:</strong> Typing 1-2 characters triggers an instant
        optimistic addition, but fails the mock backend check after 1 second.
      </p>

      {/* Todo List Render */}
      <ul className='space-y-2'>
        {todos.map((todo) => {
          // Define classes depending on optimistic state
          let itemStyle = 'bg-gray-50 text-gray-800 border-gray-200';
          if (todo.isOptimistic)
            itemStyle =
              'bg-blue-50 text-blue-400 border-blue-200 opacity-60 animate-pulse';
          if (todo.error)
            itemStyle = 'bg-red-50 text-red-600 border-red-200 font-semibold';

          return (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-3 border rounded-lg transition-all duration-300 ${itemStyle}`}
            >
              <span>{todo.title}</span>

              {/* Status Badges */}
              {todo.isOptimistic && (
                <span className='text-xs font-medium text-blue-500 bg-blue-100 px-2 py-0.5 rounded-full'>
                  Optimistic...
                </span>
              )}
              {todo.error && (
                <span className='text-xs font-medium text-red-500 bg-red-100 px-2 py-0.5 rounded-full'>
                  Failed (&lt; 3 chars)
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
