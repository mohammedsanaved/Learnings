import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [form, setForm] = useState({
    dish: '',
    servings: 2,
    diet: 'vegetarian',
    goal: 'fat_loss',
  });

  const [loading, setLoading] = useState(false);
  //   const navigat = useNavigation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('http://localhost:5000/api/recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    setLoading(false);

    const data = await res.json();

    navigate('/result', { state: data });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <button onClick={() => navigate('/')}></button>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-2xl shadow-lg w-96 space-y-4'
      >
        <h2 className='text-2xl font-bold text-center'>
          AI Recipe Generator 🍲
        </h2>

        <input
          type='text'
          placeholder='Dish Name'
          className='w-full p-2 border rounded'
          onChange={(e) => setForm({ ...form, dish: e.target.value })}
        />

        <input
          type='number'
          placeholder='Servings'
          className='w-full p-2 border rounded'
          onChange={(e) =>
            setForm({ ...form, servings: Number(e.target.value) })
          }
        />

        <select
          className='w-full p-2 border rounded'
          onChange={(e) => setForm({ ...form, diet: e.target.value })}
        >
          <option value='vegetarian'>Vegetarian</option>
          <option value='non_vegetarian'>Non-Vegetarian</option>
        </select>

        <select
          className='w-full p-2 border rounded'
          onChange={(e) => setForm({ ...form, goal: e.target.value })}
        >
          <option value='fat_loss'>Fat Loss</option>
          <option value='muscle_gain'>Muscle Gain</option>
          <option value='bulk'>Bulk</option>
        </select>

        <button
          className={`w-full bg-black text-white p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          Generate Recipe
        </button>
      </form>
    </div>
  );
}
