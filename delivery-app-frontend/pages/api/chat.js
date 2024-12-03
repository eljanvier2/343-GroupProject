import openAIInstance from './openAIInstance';
import 'dotenv/config';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: '`messages` must be a valid array.' });
  }

  try {
    const openAI = openAIInstance.getInstance();

    const chatCompletion = await openAI.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant. You work for a drone delivery service. Your job is to support users and help them regarding their questions or issues' },
        ...messages,
      ],
    });

    res.status(200).json(chatCompletion.choices[0].message);
  } catch (error) {
    console.error('Error in OpenAI API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}