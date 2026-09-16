import { useOptimistic, useState, useTransition } from 'react';

// Define the structure of a Todo item
interface Todo {
  id: number;
  text: string;
  sending?: boolean;
}

// Mock API function type declaration (Replace with your actual import)
declare function apiSaveTodoToServer(text: string): Promise<Todo>;

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Buy groceries' },
  ]);
  const [isPending, startTransition] = useTransition();

  // 1. Initialize hook with typed current state and reducer
  const [optimisticTodos, addOptimisticTodo] = useOptimistic<Todo[], string>(
    todos,
    (currentTodos, newTodoText) => [
      ...currentTodos,
      { id: Date.now(), text: newTodoText, sending: true },
    ],
  );

  async function handleAddTodo(formData: FormData) {
    const text = formData.get('todoText');

    // Ensure the text is a valid string before proceeding
    if (typeof text !== 'string' || !text.trim()) return;

    // 2. Wrap state changes in a transition
    startTransition(async () => {
      // 3. Fire the eager UI update
      addOptimisticTodo(text);
      try {
        // 4. Send API request
        const savedTodo = await apiSaveTodoToServer(text);
        // 5. Update true state on success
        setTodos((prev) => [...prev, savedTodo]);
      } catch (error) {
        console.error('Failed to save:', error);
      }
    });
  }

  return (
    <div>
      <form action={handleAddTodo}>
        <input name='todoText' required />
        <button type='submit' disabled={isPending}>
          Add
        </button>
      </form>
      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id} style={{ opacity: todo.sending ? 0.5 : 1 }}>
            {todo.text} {todo.sending && '(Sending...)'}
          </li>
        ))}
      </ul>
    </div>
  );
}
