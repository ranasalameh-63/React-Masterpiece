// import React, { useState } from 'react';
// import axios from 'axios';

// const AI = () => {
//   const [messages, setMessages] = useState([
//     { type: 'assistant', text: 'Hello! How can I assist you with your DIY project today?' }
//   ]);
//   const [userInput, setUserInput] = useState('');

//   const handleSendMessage = async () => {
//     if (userInput.trim() === '') return;

//     setMessages([...messages, { type: 'user', text: userInput }]);
//     setUserInput('');

//     try {
//       const response = await axios.post('http://localhost:7000/api/ai/ask', { message: userInput });

//       setMessages((prev) => [
//         ...prev, 
//         { type: 'assistant', text: response.data.reply }
//       ]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev, 
//         { type: 'assistant', text: 'Sorry, something went wrong. Please try again later.' }
//       ]);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="min-h-screen ">
      // {/* Hero Section */}
      // <section className="bg-gradient-to-br from-white to-orange-50 pt-40 mb-12 h-140">
      //   <div className="container mx-auto px-4 max-w-6xl">
      //     <div className="flex flex-col md:flex-row items-center justify-between gap-8">
      //       <div className="md:w-3/5">
      //         <h1 className="text-4xl md:text-4xl font-bold text-gray-800 mb-4">
      //           Welcome to Your Smart Assistant!
      //         </h1>
      //         <p className="text-lg text-gray-700 mb-6">
      //           This assistant is designed to help you easily fix common household issues. 
      //           Simply describe your problem or ask a question, and we'll provide possible solutions 
      //           or tips to get started.
      //         </p>
      //         <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-400">
      //           <p className="font-medium text-gray-800 mb-3">💡 Examples of questions you can ask:</p>
      //           <ul className="space-y-2">
      //             {["How do I fix a leaky faucet?", 
      //               "What are the steps to repair a broken tile?", 
      //               "What's the solution for peeling paint?"].map((example, index) => (
      //               <li key={index} className="flex items-center">
      //                 <span className="h-2 w-2 rounded-full bg-orange-400 mr-2"></span>
      //                 <span>{example}</span>
      //               </li>
      //             ))}
      //           </ul>
      //         </div>
      //       </div>
      //       <div className="md:w-2/5 flex justify-center">
      //         <div className="relative">
      //           <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-400 to-amber-300 opacity-70 blur"></div>
      //           <div className="relative bg-white rounded-full p-2">
      //             <div className="bg-orange-50 rounded-full p-6">
      //               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFA725" className="w-32 h-32">
      //                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
      //                 <path d="M6.5 17.5l7.5-3.5v-5.5L6.5 12z"></path>
      //                 <circle cx="12" cy="12" r="3"></circle>
      //               </svg>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </section>

//       <div className="h-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent"></div>

//       {/* Chat Area */}
//       <div className="container mx-auto px-4 py-12 max-w-4xl">
//         <div className="text-center mb-8">
//           <h2 className="text-2xl font-bold text-gray-800 inline-block bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
//             Diagnose household issues and get solutions!
//           </h2>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
//           {/* Messages Area */}
//           <div className="h-96 p-4 overflow-y-auto bg-gray-50">
//             <div className="space-y-4">
//               {messages.map((message, index) => (
//                 <div 
//                   key={index} 
//                   className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div 
//                     className={`max-w-3/4 rounded-xl p-3 ${
//                       message.type === 'user' 
//                         ? 'bg-orange-500 text-white rounded-tr-none' 
//                         : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
//                     }`}
//                   >
//                     {message.type === 'assistant' && (
//                       <div className="flex items-center mb-1">
//                         <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-2">
//                           <span className="text-orange-500 text-xs">AI</span>
//                         </div>
//                         <div className="text-xs font-medium text-gray-500">Assistant</div>
//                       </div>
//                     )}
//                     <p className={message.type === 'user' ? 'text-white' : 'text-gray-800'}>
//                       {message.text}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Input Area */}
//           <div className="p-4 border-t border-gray-200 bg-white">
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 value={userInput}
//                 onChange={(e) => setUserInput(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className="flex-1 border border-gray-300 rounded-l-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
//                 placeholder="Type your question here..."
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="bg-gradient-to-r from-orange-500 to-amber-400 text-white px-6 py-3 rounded-r-lg hover:opacity-90 transition-opacity"
//               >
//                 <div className="flex items-center">
//                   <span>Send</span>
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                   </svg>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8 text-center text-sm text-gray-500">
//           <p>Need more help? Check out our <span className="text-orange-500 hover:underline cursor-pointer">DIY Guides</span> or <span className="text-orange-500 hover:underline cursor-pointer">Contact Support</span></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AI;

import React, { useState } from 'react';
import axios from 'axios';

const AI = () => {
  const [messages, setMessages] = useState([
    { type: 'assistant', text: 'Hello! How can I assist you with your DIY project today?' }
  ]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    // إضافة رسالة المستخدم
    setMessages([...messages, { type: 'user', text: userInput }]);
    setUserInput('');

    try {
      const response = await axios.post('http://localhost:7000/api/ai/ask', { message: userInput });

      setMessages((prev) => [
        ...prev, 
        { type: 'assistant', text: response.data.reply }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev, 
        { type: 'assistant', text: 'Sorry, something went wrong. Please try again later.' }
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen">
            {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-orange-50 pt-40 mb-12 h-140">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-3/5">
              <h1 className="text-4xl md:text-4xl font-bold text-gray-800 mb-4">
                Welcome to Your Smart Assistant!
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                This assistant is designed to help you easily fix common household issues. 
                Simply describe your problem or ask a question, and we'll provide possible solutions 
                or tips to get started.
              </p>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-400">
                <p className="font-medium text-gray-800 mb-3">💡 Examples of questions you can ask:</p>
                <ul className="space-y-2">
                  {["How do I fix a leaky faucet?", 
                    "What are the steps to repair a broken tile?", 
                    "What's the solution for peeling paint?"].map((example, index) => (
                    <li key={index} className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-orange-400 mr-2"></span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:w-2/5 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-400 to-amber-300 opacity-70 blur"></div>
                <div className="relative bg-white rounded-full p-2">
                  <div className="bg-orange-50 rounded-full p-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFA725" className="w-32 h-32">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
                      <path d="M6.5 17.5l7.5-3.5v-5.5L6.5 12z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent"></div>

      {/* Chat Area */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 inline-block bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            Diagnose household issues and get solutions!
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {/* Messages Area */}
          <div className="h-96 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-3/4 rounded-xl p-3 ${message.type === 'user' ? 'bg-orange-500 text-white rounded-tr-none' : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'}`}>
                    {message.type === 'assistant' && (
                      <div className="flex items-center mb-1">
                        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                          <span className="text-orange-500 text-xs">AI</span>
                        </div>
                        <div className="text-xs font-medium text-gray-500">Assistant</div>
                      </div>
                    )}
                    <p className={message.type === 'user' ? 'text-white' : 'text-gray-800'}>
                      {message.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border border-gray-300 rounded-l-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                placeholder="Type your question here..."
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-orange-500 to-amber-400 text-white px-6 py-3 rounded-r-lg hover:opacity-90 transition-opacity"
              >
                <div className="flex items-center">
                  <span>Send</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Need more help? Check out our <span className="text-orange-500 hover:underline cursor-pointer">DIY Guides</span> or <span className="text-orange-500 hover:underline cursor-pointer">Contact Support</span></p>
        </div>
      </div>
    </div>
  );
};

export default AI;
