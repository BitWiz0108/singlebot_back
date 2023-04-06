import { Configuration, OpenAIApi } from "openai";

const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_KEY
});
const openapi = new OpenAIApi(openAIConfig);

export const chatCompletion = async (req, res) => {
  const { prompt } = req.body;
  console.log("!!@!@!@!@", prompt);

  if (prompt == " Hey") {
    res.status(200).json({ text: { role: "assistant", content: "Hey there!" } })
  } else if (prompt == " hey") {
    res.status(200).json({ text: { role: "assistant", content: "Hey there!" } })
  } else {
    const base_prompt = `Imagine you are a chatbot to help me. NOT the AI language model. Do not repeat the same responses.
    You can say me "Hey there", when only I say "Hi!".
    Don't try to finish our conversation. Let us go through just like good friends conversation go. Let us make our conversation natural and friendly. `;
    try {
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
  }
};