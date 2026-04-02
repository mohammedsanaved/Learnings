// services/ai.js
import { openai } from '../config/openai.js';

export const generateRecipeAI = async (formattedRecipe, userInput) => {
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
2. Modify for user's goal
3. Suggest healthier substitutions
4. Add calorie estimate
5. Return ONLY JSON

Output Format:
{
  "dish_name": "",
  "thumbnail": "",
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

  const completion = await openai.chat.completions.create({
    model: 'gpt-oss:120b-cloud', // your ollama model
    messages: [
      { role: 'system', content: 'You generate structured JSON only.' },
      { role: 'user', content: prompt },
    ],

    temperature: 0.7,
    max_tokens: 2800,
    response_format: { type: 'json_object' },
  });

  return completion.choices[0].message.content;
};
