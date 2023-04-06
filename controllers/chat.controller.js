import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import Axios from "axios";

const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_KEY
});
const openapi = new OpenAIApi(openAIConfig);

export const chatCompletion = async (req, res) => {

  try {
    const { prompt } = req.body;
    const answer = await openapi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
      max_tokens: 3000
    });

    const text = answer.data.choices[0].message;
    res.status(200).json({ text });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};






