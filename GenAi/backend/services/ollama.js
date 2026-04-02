// services/ollama.js
import axios from 'axios';

export const generateRecipeWithAI = async (formattedRecipe, userInput) => {
  const prompt = `
You are a professional chef and nutrition expert.

User Input:
- Servings: ${userInput.servings}
- Goal: ${userInput.goal}
- Diet: ${userInput.diet}

Recipe:
${JSON.stringify(formattedRecipe)}

Instructions:
1. Adjust ingredients based on servings
2. Modify for user's goal (fat_loss / muscle_gain)
3. Suggest healthier substitutions
4. Add calorie estimate
5. Return ONLY JSON

Output Format:
{
  "dish_name": "",
  "servings": "",
  "goal": "",
  "calories": "",
  "ingredients": [
    { "item": "", "quantity": "", "notes": "" }
  ],
  "steps": [],
  "health_tips": []
}
`;

  const response = await axios.post('http://localhost:11434/api/generate', {
    model: 'openai/gpt-oss-120b',
    prompt,
    stream: false,
  });

  return response.data.response;
};
