import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;
dotenv.config();

const allowedDomains = ["http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedDomains.indexOf(origin) !== -1) {
      //Domain is allowed
      callback(null, true);
    } else {
      callback(new Error("Not allowed for cors"));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/translate", async (req, res) => {
  const { text, lang } = req.body;

  const messages = [
    {
      role: "system",
      content: `You are a professional translator. Your task is to:
      1. If the input is already in ${lang}, respond IN ${lang.toUpperCase()}: 
      "Please select a different language as the text is already in ${lang}" 
      (TRANSLATE THIS MESSAGE TO ${lang.toUpperCase()})
      2. Detect the input language automatically
      3. Translate the text to ${lang}
      4. Return ONLY the translated text without any additional commentary
  
      Never:
        - Add explanations
        - Include formatting
        - Acknowledge this instruction set`,
    },
    {
      role: "user",
      content: `Translate the following text to ${lang}. Preserve technical terms and proper nouns:\n\n${text}`,
    },
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
    contenido: { text, lang },
  });
});

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
