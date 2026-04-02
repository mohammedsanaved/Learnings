import OpenAI from 'openai'; // Use OpenAI SDK instead
import dotenv from 'dotenv';

dotenv.config();

// Point the SDK to your local Ollama instance
const openai = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama', // Ollama doesn't check this, but the SDK requires a string
});

async function AiAnswers(question) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'Answer in 50 words' },
      { role: 'user', content: question },
    ],
    model: 'gpt-oss:120b-cloud', // REPLACE THIS with the exact name from 'ollama list'
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: true,
    // schema
  });

  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

process.stdout.write('Ask your question here: ');

// Get user input and send it to Ollama
process.stdin.on('data', async (data) => {
  const userInput = data.toString().trim();

  if (userInput.toLowerCase() === 'exit') {
    process.stdout.write('\nGoodbye!\n');
    process.exit(0);
  }
  // console.log(userInput);
  await AiAnswers(userInput);
  process.stdout.write('\nAsk your question here: ');
});
