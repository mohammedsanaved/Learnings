// utils/formatRecipe.js
export const formatRecipe = (meal) => {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const item = meal[`strIngredient${i}`];
    const quantity = meal[`strMeasure${i}`];

    if (item && item.trim() !== '') {
      ingredients.push({
        item,
        quantity: quantity || '',
      });
    }
  }

  return {
    dish_name: meal.strMeal,
    thumbnail: meal.strMealThumb,
    category: meal.strCategory,
    cuisine: meal.strArea,
    instructions: meal.strInstructions,
    ingredients,
  };
};
