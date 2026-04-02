import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Create terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Store conversation history (Context Window)
let messages = [
  {
    role: 'system',
    content: 'You are a helpful assistant.',
  },
];

// Function to ask user input
function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

// Chat loop
async function startChat() {
  console.log('🤖 Chatbot started (type "exit" to quit)\n');

  while (true) {
    const userInput = await askQuestion('You: ');

    if (userInput.toLowerCase() === 'exit') {
      console.log('👋 Goodbye!');
      rl.close();
      break;
    }

    // Add user message to context
    messages.push({
      role: 'user',
      content: userInput,
    });

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages,
        model: 'openai/gpt-oss-120b',
        temperature: 0.7,
        stream: true,
        max_completion_tokens: 100,
      });

      process.stdout.write('Bot: ');

      let fullResponse = '';

      // Stream response
      for await (const chunk of chatCompletion) {
        const content = chunk.choices[0]?.delta?.content || '';
        process.stdout.write(content);
        fullResponse += content;
      }

      console.log('\n');

      // Add assistant response to context
      messages.push({
        role: 'assistant',
        content: fullResponse,
      });

      // Optional: Limit context window (avoid token overflow)
      if (messages.length > 10) {
        messages = [messages[0], ...messages.slice(-9)];
      }
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
  }
}

startChat();
