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

  if (!text || !lang) {
    return res.status(400).json({
      translatedText: "Text and language is required"
    });
  }

  const messages = [
    {
      role: "system",
      content: `You are a professional translator. Your task is to:
      1. Detect the input language automatically
      2. Translate the text to ${lang}
      3. Return ONLY the translated text without any additional commentary
  
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
    console.error("Error en /api/translate:", error);

    if (error instanceof OpenAI.APIError) {
      const statusCode = error.status || 500;
      const message = {
        401: "Invalid or missing API key",
        429: "Rate limit exceeded - Please try again later",
        400: "Invalid request parameters",
        404: "Model not found",
        503: "Service temporarily unavailable"
      }[statusCode] || "OpenAI API error";

      return res.status(statusCode).json({ translatedText: message });
    }

    return res.status(500).json({
      translatedText: "Internal server error - Please try again"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
