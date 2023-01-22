import { message } from "antd";
import React, { useState, createContext, useRef } from "react";

const ChatContext = createContext();

const ChatProvider = ({children}) => {
  const [chatMessages, setChatMessages] = useState([
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollDown = useRef(null);
  
  const handleClear = () => {
    setChatMessages([]);
  }

  const handleSubmit = async () => {
    if (!input) return;
    setLoading(true);
    
    let chatLog = [...chatMessages, {type: "user", text: input}]
    setInput("");
    setChatMessages(chatLog)
        
    if(chatMessages.length > 0) {
    scrollDown.current.scrollIntoView({ behavior: "smooth" });
    }
    
    const parsedMessage = chatLog.map((message) => {
      const prefix = message.type === "bot" ? `\nAI: ${message.text.replace(/^\n\n/, '')}` : `\nHuman: ${message.text}`;
      return prefix;
    }).join("")

    const response = await fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?${parsedMessage}\nAI:`,
        stops: ["AI: ", "Human: "],
        temperature: 0.5,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6
      })
    })
    const data = await response.json()
    setChatMessages([...chatLog, {type: "bot", text: `${data.completionText}`}])

    scrollDown.current.scrollIntoView({ behavior: "smooth" });

    setLoading(false);
  }

  return (
    <ChatContext.Provider value={{
      input, setInput, loading, setLoading, open, setOpen, scrollDown, handleClear, handleSubmit, chatMessages
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export { ChatContext, ChatProvider };
