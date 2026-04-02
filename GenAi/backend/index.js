import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const chatCompletion = await groq.chat.completions.create({
  messages: [
    {
      role: 'system',
      content: 'Answer in 10 words',
    },
    {
      role: 'user',
      content: 'What is Coding',
    },
  ],
  //   model: 'meta-llama/llama-4-scout-17b-16e-instruct',
  model: 'openai/gpt-oss-120b',
  temperature: 1,
  max_completion_tokens: 9000,
  top_p: 1,
  stream: true,
  stop: null,
});
console.log(process.env.Port);
// console.log(chatCompletion, 'RAW value');

for await (const chunk of chatCompletion) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
  //   console.log(chunk);
}
