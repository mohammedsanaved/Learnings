import { useState } from 'react'
import { Plus, Loader2 } from "lucide-react"
import { useDispatch } from 'react-redux'
import { addTodo } from '../store/slices/todoSlices'

interface TodoInputProps {
    onAddTodo?: (text: string) => Promise<void> | void;
    isPending?: boolean;
}

const TodoInput = ({ onAddTodo, isPending }: TodoInputProps) => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const handleTodoInput = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (input.trim().length > 0) {
            if (onAddTodo) {
                onAddTodo(input.trim());
            } else {
                dispatch(addTodo(input.trim()));
            }
            setInput('');
        }
    }

    return (
        <form onSubmit={handleTodoInput} className='flex items-center space-x-2 mt-4 w-full'>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Enter your task'
                className='border-b-2 flex-1 border-black px-1 py-1.5 outline-none'
            />
            <button
                type="submit"
                disabled={isPending}
                className='p-1.5 bg-black rounded-md cursor-pointer hover:bg-gray-800 disabled:opacity-50'
            >
                {isPending ? (
                    <Loader2 size={18} color='white' className='animate-spin' />
                ) : (
                    <Plus size={18} color='white' />
                )}
            </button>
        </form>
    )
}

export default TodoInput