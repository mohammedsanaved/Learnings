// store/useTodoStore.ts
import { create } from 'zustand';

export interface Todo {
  id: string;
  title: string;
  isOptimistic?: boolean; // Tracks if it's currently an optimistic UI update
  error?: boolean; // Tracks if the backend synchronization failed
}

interface TodoState {
  todos: Todo[];
  addTodo: (title: string) => Promise<void>;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [
    { id: '1', title: 'Learn Next.js' },
    { id: '2', title: 'Master Zustand' },
  ],

  addTodo: async (title: string) => {
    const optimisticId = crypto.randomUUID();

    // 1. Create the optimistic todo object
    const newTodo: Todo = {
      id: optimisticId,
      title: title,
      isOptimistic: true, // Mark it true instantly for UI feedback
    };

    // 2. OPTIMISTIC UPDATE: Update the global state immediately
    set((state) => ({ todos: [...state.todos, newTodo] }));

    try {
      // Simulate network latency (e.g., 1 second)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 3. APPLY BUSINESS RULE: If less than 3 characters, mock a backend failure
      if (title.trim().length < 3) {
        throw new Error('Title too short! Must be at least 3 characters.');
      }

      // 4. SUCCESS: Confirm backend saved it by turning off the optimistic flag
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === optimisticId ? { ...todo, isOptimistic: false } : todo,
        ),
      }));
    } catch (err) {
      // 5. ROLLBACK / ERROR HANDLING: Either remove it or mark it as an error
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === optimisticId
            ? { ...todo, isOptimistic: false, error: true } // Show error state
            : todo,
        ),
      }));

      // Optional: Auto-remove the failed item after 3 seconds
      setTimeout(() => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== optimisticId),
        }));
      }, 3000);
    }
  },
}));
