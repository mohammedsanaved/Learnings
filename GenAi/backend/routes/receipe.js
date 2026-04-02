// routes/recipe.js
import express from 'express';
import { fetchRecipeByName } from '../services/mealdb.js';
import { formatRecipe } from '../utils/formatReceipt.js';
import { generateRecipeAI } from '../services/ai.js';
// import { generateRecipeWithAI } from '../services/ollama.js';

const router = express.Router();

// ✅ Add this function (or import from utils)
function safeParseJSON(text) {
  // If it's already an object, return as-is
  if (typeof text === 'object' && text !== null) return text;

  // Strip markdown code fences (```json ... ``` or ``` ... ```)
  const stripped = text
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim();

  // Try direct parse first
  try {
    return JSON.parse(stripped);
  } catch {
    // Fallback: extract first JSON object or array from the string
    const match = stripped.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (innerErr) {
        throw new Error(`Failed to parse extracted JSON: ${innerErr.message}`);
      }
    }
    throw new Error(
      `No valid JSON found in LLM response. Raw: ${text.slice(0, 200)}`,
    );
  }
}
router.post('/', async (req, res) => {
  try {
    const { dish, servings, goal, diet } = req.body;

    // 1. Fetch from API
    const meal = await fetchRecipeByName(dish);
    console.log(meal, '------------------meal');
    if (!meal) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // 2. Format data
    const formattedRecipe = formatRecipe(meal);

    // 3. Send to LLM
    // const aiResponse = await generateRecipeWithAI(formattedRecipe, {
    const aiResponse = await generateRecipeAI(formattedRecipe, {
      servings,
      goal,
      diet,
    });
    console.log(aiResponse, '------------------ai');

    const parsed = safeParseJSON(aiResponse);
    // const parsed = aiResponse;
    res.json(parsed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
