import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages' });
    }

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: messages
    });

    res.status(200).json({
      reply: response.output_text
    });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'AI failed to respond' });
  }
}
