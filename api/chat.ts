import type { VercelRequest, VercelResponse } from '@vercel/node';

const SYSTEM_PROMPT = `
You are the official AI admissions assistant for GLA Online University.

Help prospective students with:
- Programmes and courses
- Eligibility requirements
- Admission process
- Fees and scholarships
- Online learning experience

Be friendly, professional, concise, and helpful.
Do not invent fees, eligibility rules, scholarship amounts, deadlines, or university policies.
If you are uncertain, tell the student to verify the information with the official admissions team.
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Gemini API key is missing' });
    }

    try {
        const { messages } = req.body ?? {};

        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ error: 'Messages are required' });
        }

        const contents = messages
            .filter((message: any) =>
                ['user', 'assistant'].includes(message.role)
            )
            .map((message: any) => ({
                role: message.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: String(message.content ?? '') }],
            }));

        const response = await fetch(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': apiKey,
                },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{ text: SYSTEM_PROMPT }],
                    },
                    contents,
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 500,
                    },
                }),
            }
        );

        const data = await response.json();

        // Handle Gemini API errors only when the request actually fails
        if (!response.ok) {
            console.error('Gemini API error:', data);

            return res.status(response.status).json({
                error: data?.error?.message || 'Gemini API request failed',
            });
        }

        // Extract Gemini response
        const reply =
            data?.candidates?.[0]?.content?.parts
                ?.map((part: any) => part.text ?? '')
                .join('')
                .trim() || 'Sorry, I could not generate a response. Please try again.';

        return res.status(200).json({ reply });

    } catch (error) {
        console.error('Chat API error:', error);
        return res.status(500).json({ error: 'Failed to generate response' });
    }
}