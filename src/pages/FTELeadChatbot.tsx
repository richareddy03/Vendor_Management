// import React, { useState, useEffect, useRef } from "react";
// import { MessageCircle, Send, X } from "lucide-react";

// const FteLeadChatbot = ({ isOpen: isOpenProp, onClose: onCloseProp }) => {
//   const [isOpen, setIsOpen] = useState(isOpenProp || false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const chatContainerRef = useRef(null);

//   useEffect(() => {
//     setIsOpen(isOpenProp);
//     if (isOpenProp && messages.length === 0) {
//       addBotMessage("How may I help you? Choose an option:", [
//         { text: "View Pending Approvals", action: () => handleOptionSelect("pending") },
//         { text: "Track Onboarding", action: () => handleOptionSelect("onboarding") },
//         { text: "Chat with Support", action: () => handleOptionSelect("support") },
//       ]);
//     }
//   }, [isOpenProp]);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const addBotMessage = (text, options = []) => {
//     setMessages(prev => [...prev, { type: "bot", text, options, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
//   };

//   const addUserMessage = (text) => {
//     setMessages(prev => [...prev, { type: "user", text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
//   };

//   const handleOptionSelect = (option) => {
//     addUserMessage(option);
//     switch (option) {
//       case "pending":
//         addBotMessage("Fetching pending approvals details...");
//         break;
//       case "onboarding":
//         addBotMessage("Tracking onboarding status...");
//         break;
//       case "support":
//         addBotMessage("Feel free to ask about vendor management or approvals!");
//         break;
//     }
//   };

//   const handleSend = () => {
//     if (!input.trim()) return;
//     addUserMessage(input);
//     addBotMessage("Thanks for your message! I'm here to assist with vendor management queries.", []);
//     setInput("");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   const toggleChat = () => {
//     setIsOpen(!isOpen);
//     if (onCloseProp) onCloseProp(!isOpen);
//   };

//   return (
//     <>
//       <div className="fixed bottom-6 right-6 z-50">
//         <button
//           onClick={toggleChat}
//           className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
//           aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
//         >
//           {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
//         </button>
//       </div>

//       {isOpen && (
//         <div className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-50">
//           <div
//             className="flex justify-between items-center p-2 rounded-t-lg"
//             style={{
//               background: "linear-gradient(to right, #6B46C1, #4C51BF)",
//               color: "white",
//             }}
//           >
//             <h3 className="font-semibold text-lg">Assistant</h3>
//             <button
//               className="text-white hover:text-gray-200"
//               onClick={toggleChat}
//             >
//               ✕
//             </button>
//           </div>
//           <div ref={chatContainerRef} className="p-2 max-h-72 overflow-y-auto">
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`mb-2 ${message.type === "user" ? "text-right" : "text-left"}`}
//               >
//                 <div
//                   className={`inline-block p-2 rounded-lg ${
//                     message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
//                   }`}
//                 >
//                   <p className="text-sm">{message.text}</p>
//                   <span className="text-xs text-gray-500 block mt-1">{message.timestamp}</span>
//                 </div>
//                 {message.options && message.options.length > 0 && (
//                   <div className="mt-2 flex flex-col gap-2">
//                     {message.options.map((option, optIndex) => (
//                       <button
//                         key={optIndex}
//                         onClick={() => option.action()}
//                         className="w-full text-left p-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
//                       >
//                         {option.text}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className="p-2 flex">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Type your message..."
//               className="w-full p-2 border rounded-l-lg focus:outline-none text-sm"
//             />
//             <button
//               onClick={handleSend}
//               className="bg-blue-500 text-white p-2 rounded-r-lg"
//             >
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
//                 ></path>
//               </svg>
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default FteLeadChatbot;


import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FteLeadChatbot = ({ isOpen: isOpenProp, onClose: onCloseProp }) => {
  const [isOpen, setIsOpen] = useState(isOpenProp || false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    setIsOpen(isOpenProp);
    if (isOpenProp && messages.length === 0) {
      addBotMessage("How can I assist you today? Choose an option:", [
        { text: "View Pending Approvals", action: () => handleOptionSelect("pending") },
        { text: "Track Onboarding", action: () => handleOptionSelect("onboarding") },
        { text: "Chat with Support", action: () => handleOptionSelect("support") },
      ]);
    }
  }, [isOpenProp]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const addBotMessage = (text, options = []) => {
    setMessages(prev => [...prev, { type: "bot", text, options }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { type: "user", text }]);
  };

  const handleOptionSelect = (option) => {
    addUserMessage(option);
    switch (option) {
      case "pending":
        addBotMessage("Fetching pending approvals details...");
        break;
      case "onboarding":
        addBotMessage("Tracking onboarding status...");
        break;
      case "support":
        addBotMessage("Feel free to ask me anything about vendor management or approvals!");
        break;
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    addUserMessage(input);
    addBotMessage("Thanks for your message! How can I assist further with vendor management?");
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (onCloseProp) onCloseProp(!isOpen);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white text-xs"
          size="icon"
          aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        >
          {isOpen ? <X className="h-7 w-7 text-white" /> : <MessageCircle className="h-7 w-7 text-white" />}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-full sm:w-80 h-[400px] bg-white rounded-xl shadow-2xl z-50 flex flex-col transition-all duration-300">
          <div className="flex items-center justify-between p-2 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl text-xs">
            <span className="font-semibold">FTELead Assistant</span>
            <Button variant="ghost" size="sm" onClick={toggleChat} className="text-white hover:text-gray-200">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 text-xs">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[80%] ${message.type === "user" ? "ml-auto bg-blue-500 text-white" : "bg-white text-gray-800"} p-2 rounded-xl shadow-md`}
              >
                {message.text}
                {message.options && message.options.length > 0 && (
                  <div className="mt-2 flex flex-col gap-2">
                    {message.options.map((option, optIndex) => (
                      <Button
                        key={optIndex}
                        onClick={() => option.action()}
                        variant="outline"
                        className="w-full bg-white hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 rounded-lg text-xs"
                      >
                        {option.text}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-2 border-t bg-gray-50 flex items-center rounded-b-xl">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 text-xs p-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleSend} size="icon" className="bg-blue-500 hover:bg-blue-600 ml-2 rounded-lg">
              <Send className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default FteLeadChatbot;