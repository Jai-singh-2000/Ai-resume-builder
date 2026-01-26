import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";

const ChatWindow = ({ resumeId }) => {
  const { user } = useAuth(); // Get logged-in user ID for the backend
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I've analyzed your resume. How can I help you improve it further?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const response = await axios.post("http://localhost:5000/api/chat/send", {
        resumeId: resumeId, // passed from parent Analyze.jsx
        message: input,
        userId: user.id,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: response.data.reply,
          sender: "bot",
        },
      ]);
    } catch (err) {
      console.error("Chat failed:", err);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center gap-2">
        <Bot className="h-5 w-5 text-blue-600" />
        <span className="font-bold text-gray-700">Resume Assistant</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-tr-none"
                  : "bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={sendMessage}
        className="p-4 border-t border-gray-200 bg-white flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI about your resume..."
          className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;