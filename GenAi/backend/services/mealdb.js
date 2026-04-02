// services/mealdb.js
import axios from 'axios';

export const fetchRecipeByName = async (dish) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`;
  const response = await axios.get(url);
  return response.data.meals?.[0];
};
