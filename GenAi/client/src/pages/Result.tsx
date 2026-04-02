import { useNavigate, useLocation } from 'react-router-dom';

export default function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { loading, error } = state || {};

  console.log(state, '---------------state');

  // 🔄 LOADING STATE
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin h-10 w-10 border-4 border-black border-t-transparent rounded-full mx-auto'></div>
          <p className='mt-4 text-gray-600'>Generating your AI recipe...</p>
        </div>
      </div>
    );
  }

  //   if (!state) {
  //     return (
  //       <div className='min-h-screen flex items-center justify-center'>
  //         <p>No state available</p>
  //       </div>
  //     );
  //   }

  // ❌ ERROR STATE
  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-white p-6 rounded-xl shadow text-center'>
          <h2 className='text-xl font-bold text-red-500'>
            Something went wrong ❌
          </h2>
          <p className='text-gray-600 mt-2'>{error}</p>

          <button
            onClick={() => navigate('/')}
            className='mt-4 bg-black text-white px-4 py-2 rounded'
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-6'>
      <button
        onClick={() => navigate('/')}
        className='bg-black text-white p-2 rounded'
      >
        ← Back to Home
      </button>
      {/* Header */}
      <div className='bg-white p-6 rounded-xl shadow'>
        <img
          src={state.thumbnail}
          alt={state.dish_name}
          className='w-full h-64 object-cover rounded'
        />

        <h1 className='text-3xl font-bold mt-4'>{state.dish_name}</h1>

        <p className='text-gray-600'>
          {state.goal} • {state.calories}
        </p>
      </div>

      {/* Ingredients */}
      <div className='bg-white p-6 rounded-xl shadow'>
        <h2 className='text-xl font-semibold mb-3'>Ingredients</h2>
        <ul className='space-y-2'>
          {state.ingredients.map((ing, i) => (
            <li key={i} className='flex justify-between'>
              <span>{ing.item}</span>
              <span className='text-gray-500'>{ing.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className='bg-white p-6 rounded-xl shadow'>
        <h2 className='text-xl font-semibold mb-3'>Steps</h2>
        <ol className='ml-5 space-y-2'>
          {state.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>

      {/* Tips */}
      <div className='bg-white p-6 rounded-xl shadow'>
        <h2 className='text-xl font-semibold mb-3'>Health Tips</h2>
        <ul className='ml-5 space-y-2'>
          {state.health_tips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
