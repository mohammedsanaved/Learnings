import { X } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { deleteTodo, toggleTodo, type TodoItem } from "../store/slices/todoSlices";
import type { RootState } from "../store/store";

interface TodoListProps {
  todos?: TodoItem[];
}

const TodoList = ({ todos: propTodos }: TodoListProps) => {
  const reduxTodos = useSelector((state: RootState) => state.todos.todos);
  const todos = propTodos ?? reduxTodos;
  const dispatch = useDispatch();

  return (
    <div className='mt-4 flex flex-col w-full justify-between items-center'>
      {todos && todos.length > 0 ? null : (
        <div className='flex items-center space-x-2 p-2'>
          <p className='font-medium flex-1 text-gray-500'>No todos found</p>
        </div>
      )}
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`flex justify-between gap-4 w-full space-x-2 p-2 my-2 border border-gray-400 rounded-md transition-all ${todo.sending ? 'opacity-60 bg-gray-50 border-dashed animate-pulse' : ''
            }`}
        >
          <input
            type="checkbox"
            name="completed"
            id={`completed-${todo.id}`}
            checked={todo.completed}
            disabled={todo.sending}
            onChange={() => dispatch(toggleTodo(todo.id))}
          />
          <p className={`font-medium flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
            {todo.text}
            {todo.sending && <span className='text-xs text-blue-500 font-normal ml-2'>...</span>}
          </p>
          <button
            className='ml-4 p-1 rounded-md cursor-pointer hover:bg-black-600 disabled:opacity-40'
            disabled={todo.sending}
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            <X size={18} color='red' />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList
