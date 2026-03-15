// const GROQ_API_KEY = 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;
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
  max_completion_tokens: 1024,
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

// import { groq } from '@ai-sdk/groq';
// import { generateText } from 'ai';

// const { text } = await generateText({
//   model: groq('llama-3.3-70b-versatile'),
//   prompt: 'What is the meaning of this name Mohammed',
// });
// console.log(text);
