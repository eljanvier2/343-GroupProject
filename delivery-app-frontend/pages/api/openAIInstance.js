import OpenAI from 'openai'

class OpenAIInstance {
  constructor () {
    if (!OpenAIInstance.instance) {
      // Ensure API key exists
      if (!process.env.API_KEY) {
        throw new Error('Missing OpenAI API key. Set API_KEY in your environment variables.')
      }

      // Initialize the OpenAI client
      OpenAIInstance.instance = new OpenAI({
        apiKey: process.env.API_KEY
      })
    }
  }

  getInstance () {
    return OpenAIInstance.instance
  }
}

const openAIInstance = new OpenAIInstance()
Object.freeze(openAIInstance) // Ensure immutability

export default openAIInstance
