import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";


const app = express();
const PORT = process.env.PORT || 4000;
dotenv.config();


app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/translate', async (req, res) => {

  const { text, lang } = req.body;

  const messages = [
    {
      role: "system",
      content: "You are a professional translator"
    },
    {
      role: "system",
      content: "Return ONLY the translated text with NO additional commentary, explanations, or formatting."
    },
    {
      role: "user",
      content: `Translate the following text to ${lang}. Preserve technical terms and proper nouns:\n\n${text}`
    }
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages,
      max_tokens: 500,
    });
    const translation = response.choices[0].message.content;
    return res.status(200).json({ translatedText: translation });
  } catch (error) {
    console.error(error);
  }

  return res.status(200).json({
    message: "Respuesta",
    contenido: {text, lang}
  });
});

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
