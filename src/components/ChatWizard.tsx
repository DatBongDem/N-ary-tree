import { useState, useEffect, useRef } from "react";
import { Node } from "../models/Node";

interface ChatWizardProps {
  root: Node;
}

interface Message {
  text: string;
  sender: "bot" | "user";
}

const ChatWizard: React.FC<ChatWizardProps> = ({ root }) => {
  const [currentNode, setCurrentNode] = useState(root);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Effect to initialize the chat
  useEffect(() => {
    setMessages([{ text: "Bạn muốn mua gì?", sender: "bot" }]);
  }, [root]);

  // Effect to scroll to the bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelect = (child: Node) => {
    // 1. Add user's message immediately
    setMessages((prev) => [...prev, { text: child.value, sender: "user" }]);
    
    // 2. Update current node
    setCurrentNode(child);
    
    // 3. Show typing indicator and wait
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      // 4. Add bot's response
      const isLeaf = child.children.length === 0;
      if (!isLeaf) {
        const nextQuestion = `Bạn muốn chọn ${child.value.toLowerCase()} loại nào?`;
        setMessages((prev) => [...prev, { text: nextQuestion, sender: "bot" }]);
      } else {
        const finalMessage = `Lựa chọn tuyệt vời! Bạn đã chọn: <b>${child.value}</b>`;
        setMessages((prev) => [...prev, { text: finalMessage, sender: "bot" }]);
      }
    }, 1000); // 1-second delay
  };

  const handleRestart = () => {
    setCurrentNode(root);
    setMessages([{ text: "Bạn muốn mua gì?", sender: "bot" }]);
  };

  const isLeaf = currentNode.children.length === 0;

  return (
    <div className="chat-container">
      <div className="chat-header">Tư vấn mua sắm</div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${
              msg.sender === "bot" ? "bot-bubble" : "user-bubble"
            }`}
            dangerouslySetInnerHTML={{ __html: msg.text }}
          >
          </div>
        ))}
        {isTyping && (
          <div className="chat-bubble bot-bubble typing-indicator">
            <span></span><span></span><span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-options">
        {isTyping ? null : !isLeaf ? (
          currentNode.children.map((child) => (
            <button
              key={child.value}
              onClick={() => handleSelect(child)}
              className="chat-option-button"
            >
              {child.value}
            </button>
          ))
        ) : (
          <button onClick={handleRestart} className="restart-button">
            Bắt đầu lại
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatWizard;
