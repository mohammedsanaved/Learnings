import { useOptimistic, useTransition, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { addTodo, type TodoItem } from '../store/slices/todoSlices'
import TodoInput from "../components/TodoInput"
import TodoList from "../components/TodoList"

const Todo = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pages, setPages] = useState(1);
  const pagePerItem = 10;
  const totalItems = todos.length;
  const totalPages = Math.ceil(totalItems / pagePerItem);

  const startIndex = (pages - 1) * pagePerItem;
  const endIndex = startIndex + pagePerItem;
  const currentTodos = todos.slice(startIndex, endIndex);

  // React 19 useOptimistic hook
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (currentTodos: TodoItem[], newTodo: TodoItem) => [...currentTodos, newTodo]
  );

  const handleNextPage = () => {
    setPages(p => {
      if (p >= totalPages) {
        return p;
      }
      return p + 1;
    })
  }

  const handlePreviousPage = () => {
    setPages(p => {
      if (p <= 1) {
        return p;
      }
      return p - 1;
    })
  }

  const handleAddTodo = async (text: string) => {
    setErrorMessage(null);

    startTransition(async () => {
      // 1. Optimistically display the new todo immediately
      addOptimisticTodo({
        id: Date.now(),
        text,
        completed: false,
        sending: true,
      });

      // 2. Simulate network / server delay (1s) so the optimistic update is clearly visible
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 3. Rollback condition: less than 2 characters
      if (text.trim().length < 2) {
        setErrorMessage("Todo must be at least 2 characters long. Changes rolled back!");
        // We do not dispatch to Redux.
        // Once this transition ends, React 19 automatically rolls back optimisticTodos to match Redux!
        return;
      }

      // 4. Success: commit to Redux store
      dispatch(addTodo(text.trim()));
    });
  };

  return (
    <div className='h-screen'>
      <h1 className='font-medium text-2xl py-4 flex justify-center items-center'>Todo App</h1>

      {/* Centered container with uniform width */}
      <div className='w-full max-w-[450px] mx-auto px-4'>
        <TodoInput onAddTodo={handleAddTodo} isPending={isPending} />

        {errorMessage && (
          <div className='mt-3 p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded flex justify-between items-center'>
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage(null)}
              className='ml-2 text-red-700 font-bold hover:text-red-900 cursor-pointer text-base leading-none'
            >
              ×
            </button>
          </div>
        )}

        <TodoList todos={currentTodos} />
        <div className='mt-8 flex justify-center items-center'>
          <button
            onClick={handlePreviousPage}
            disabled={1 >= pages}
            className='px-4 py-2 bg-black text-white rounded-md cursor-pointer hover:bg-gray-800 disabled:opacity-40'
          >
            Previous
          </button>
          <span className='mx-4'>{pages}</span>

          <button
            onClick={handleNextPage}
            disabled={totalPages <= pages}
            className='ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer disabled:opacity-40'>
            Next
          </button>
        </div>

      </div>
    </div>
  )
}

export default Todo