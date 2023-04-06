import { Configuration, OpenAIApi } from "openai";

const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_KEY
});
const openapi = new OpenAIApi(openAIConfig);

export const chatCompletion = async (req, res) => {
  const base_prompt = `I would say "hey," and then you would say "Hey there!". Don't try to finish our conversation. Let us go through just like good friends conversation go. `;
  try {
    const { prompt } = req.body;
    const answer = await openapi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: base_prompt + prompt }],
      temperature: 0,
      max_tokens: 3000
    });
    console.log("This is the real prompt that the back-end is saying:", base_prompt + prompt);
    const text = answer.data.choices[0].message;
    res.status(200).json({ text });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};