import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../store";

export interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
    sending?: boolean;
}

interface TodoState {
    todos: TodoItem[];
}

const initialState: TodoState = {
    todos: [],
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state: TodoState, action: PayloadAction<string>) => {
            state.todos.push({
                text: action.payload,
                id: Date.now(),
                completed: false
            });
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            const item = state.todos.find((todo) => todo.id === action.payload);
            if (item) {
                item.completed = !item.completed;
            }
        },
    },
});

// Export selector
export const selectTodos = (state: { todos: TodoState }) => state.todos.todos;

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
