import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { POLICY_CATEGORIES, DEPARTMENT_CONTACTS, generateKnowledgeBasePromptText } from './src/data/policyHandbook';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK lazily / safely
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `You are "College Policy Assistant", a helpful AI chatbot designed to assist students with questions related to college policies and rules.

Your role is to provide clear, simple, accurate, and student-friendly information about college policies.

You can help students with topics such as:
* Attendance policies
* Examination rules
* Internal assessment and marks
* Assignment submission rules
* Fee payment policies
* Scholarship information
* Library rules
* Hostel rules
* Leave and permission policies
* Student code of conduct
* Anti-ragging policies
* Campus rules and regulations
* Placement and internship policies

Rules for your responses:
1. Always provide answers in simple and easy-to-understand language.
2. Be polite, friendly, and helpful.
3. If the answer is available in the provided college policy documents or knowledge base, use that information.
4. Do not invent or guess college policies.
5. If you do not have enough information, clearly say:
   "I don't have confirmed information about this policy. Please contact your college administration or the concerned department."
6. When explaining a policy, provide the answer in short points when possible.
7. For important policies, mention that students should verify the latest official college notification.
8. Do not provide personal, legal, medical, or confidential advice.
9. Stay focused on college-related policies and student questions.
10. If a student asks something unrelated to college policies, politely explain that you specialize in college policies and regulations.

Example:
Student: What is the minimum attendance required?
Assistant: The minimum attendance requirement depends on your college's official policy. Please check the latest attendance regulations or contact your department. If the policy document is available in my knowledge base, I can provide the exact requirement.

Always act as a reliable, friendly, and professional College Policy Assistant.

${generateKnowledgeBasePromptText()}
`;

// Helper for local knowledge-base lookup fallback if GEMINI_API_KEY is temporarily unavailable
function fallbackPolicyAnswer(userQuestion: string): string {
  const query = userQuestion.toLowerCase();
  
  // Topic matching
  for (const cat of POLICY_CATEGORIES) {
    for (const topic of cat.topics) {
      const matchWords = topic.title.toLowerCase().split(' ').concat(topic.suggestedQuestions.map(q => q.toLowerCase()));
      const hits = matchWords.filter(w => w.length > 3 && query.includes(w));
      if (hits.length > 0 || query.includes(cat.name.toLowerCase().split(' ')[0])) {
        const points = topic.keyPoints.map(p => `• ${p}`).join('\n');
        return `Here is the information from the college policy on **${topic.title}**:\n\n${points}\n\n*Note: ${topic.officialNote}*\n\nFor official confirmation, please reach out to **${topic.concernedDepartment}**. Please also verify the latest official college notification.`;
      }
    }
  }

  return "I don't have confirmed information about this policy. Please contact your college administration or the concerned department.";
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    time: new Date().toISOString()
  });
});

app.get('/api/policies', (req, res) => {
  res.json({
    categories: POLICY_CATEGORIES
  });
});

app.get('/api/contacts', (req, res) => {
  res.json({
    contacts: DEPARTMENT_CONTACTS
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: 'Valid messages array is required.' });
      return;
    }

    const lastMessage = messages[messages.length - 1];
    const userPrompt = lastMessage?.content || '';

    const ai = getGeminiClient();

    if (!ai) {
      // Graceful fallback to handbook knowledge base if API key is not yet set in environment
      const localResponse = fallbackPolicyAnswer(userPrompt);
      res.json({
        response: localResponse,
        note: 'Generated via grounded official handbook knowledge base.'
      });
      return;
    }

    // Format multi-turn conversation history for @google/genai
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.2, // low temperature for high fidelity to policies
      }
    });

    const replyText = response.text || "I don't have confirmed information about this policy. Please contact your college administration or the concerned department.";

    res.json({
      response: replyText
    });
  } catch (err: unknown) {
    console.error('Error in /api/chat:', err);
    // Provide student-friendly error while adhering to policy assistant persona
    const lastQuestion = req.body?.messages?.[req.body.messages.length - 1]?.content || '';
    const fallback = fallbackPolicyAnswer(lastQuestion);
    res.json({
      response: fallback,
      isFallback: true
    });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`College Policy Assistant server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
