// const { OpenAI } = require("openai");

// const apiKey = "33fa5b7a38944a0a92db9722e43a7574";  
// const baseURL = "https://api.aimlapi.com/v1";
// const systemPrompt = "You are a travel agent. Be descriptive and helpful";  
// const userPrompt = "Tell me about San Francisco";  

// const api = new OpenAI({
//   apiKey,
//   baseURL,
// });

// const getAIResponse = async (req, res) => {
//   const { message } = req.body; 
//   console.log('Received message:', message);

//   if (!message) {
//     return res.status(400).json({ error: 'Message is required' });
//   }

//   try {
//     const completion = await api.chat.completions.create({
//       model: "gpt-4o", 
//       messages: [
//         { role: "system", content: systemPrompt },  
//         { role: "user", content: message },  
//       ],
//       temperature: 0.7,
//       max_tokens: 256,  
//     });

//     const response = completion.choices[0].message.content;  

//     res.json({ reply: response });
//   } catch (error) {
//     console.error('Error fetching AI response:', error);
//     res.status(500).json({ error: 'Failed to fetch AI response' });
//   }
// };

// module.exports = { getAIResponse };




const { OpenAI } = require("openai");
const Message = require('../Models/aiModel');  

const apiKey = "873d5551fe8b4add805a9e50c9823cc9";  
const baseURL = "https://api.aimlapi.com/v1";

const api = new OpenAI({
  apiKey,
  baseURL,
});

const getAIResponse = async (req, res) => {
  const { message } = req.body;  

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const completion = await api.chat.completions.create({
      model: "gpt-4o",  
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 256,
    });

    const aiResponse = completion.choices[0].message.content;

    const newMessage = new Message({
      message: message,
      response: aiResponse
    });

    await newMessage.save();

    res.json({ reply: aiResponse });

  } catch (error) {
    console.error('Error fetching AI response:', error);
    res.status(500).json({ error: 'Failed to fetch AI response' });
  }
};

module.exports = { getAIResponse };

