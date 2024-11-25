import OpenAI from 'openai';

class OpenAIInstance {
  constructor() {
    if (!OpenAIInstance.instance) {
      OpenAIInstance.instance = new OpenAI({
        apiKey: process.env.API_KEY
      });
    }
  }

  getInstance() {
    return OpenAIInstance.instance;
  }
}

const openAIInstance = new OpenAIInstance();
Object.freeze(openAIInstance);

export default openAIInstance;