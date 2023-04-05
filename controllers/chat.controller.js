import { Configuration, OpenAIApi } from "openai";
import fs from "fs";
import Axios from "axios";

const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_KEY
});
const openapi = new OpenAIApi(openAIConfig);
const training_data = fs.createReadStream("training_data.json");

// export const fineTune = async (req, res) => {
//   try {
//     const response1 = await openapi.createFile(
//       training_data,
//       "fine-tune"
//     );
//     const response2 = await openapi.createFineTune({
//       training_file: 'file-W24oryeTLfsQCtgsmdR5xbWs',
//     });
//     res.status(200).json({
//       response2
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err.message
//     })
//   }
// }

export const chatCompletion = async (req, res) => {
  console.log("!@#!@#!@#");
  try {
    const { prompt } = req.body;
    const answer = await openapi.createCompletion({
      model: "davinci:ft-vine-strategies-2023-04-04-17-08-36",
      // model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 3000
    });
    const text = answer.data.choices[0].text;
    res.status(200).json({ text });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};






