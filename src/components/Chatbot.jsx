import React, { useState, useRef } from 'react';

const botReplies = (text) => {
  const t = text.toLowerCase();
  if (t.includes('price') || t.includes('cost')) return "You can check our base prices on the Pricing page. For custom designs, please visit us!";
  if (t.includes('book') || t.includes('appointment')) return "You can book an appointment directly through our 'Book Appointment' button or visit our Contact page.";
  if (t.includes('human') || t.includes('call')) return "You can call us directly at +91 81226 98966.";
  if (t.includes('track') || t.includes('order')) return "Go to our Track Order page and enter your Order ID to check the status.";
  if (t.includes('timing') || t.includes('hour')) return "We are open Mon-Sat: 9:00 AM - 9:00 PM. Sunday is a holiday.";
  return "Thank you for your message. Our team will get back to you shortly.";
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! Welcome to Selvi Couture House. How can I help you today?",
      isBot: true,
      options: ['Book Appointment', 'Track Order', 'Pricing', 'Talk to Human']
    }
  ]);
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);

  function addMessage(text, isBot = false, options = []) {
    setMessages(prev => [...prev, { text, isBot, options }]);
    setTimeout(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, 50);
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    addMessage(text, false);
    setInput('');
    setTimeout(() => addMessage(botReplies(text), true), 1000);
  }

  return (
    <div className="chatbot-container">
      {!open && (
        <button id="chatbot-toggle" className="chatbot-btn" onClick={() => setOpen(true)}>
          <i className="fas fa-comment-dots"></i>
        </button>
      )}
      {open && (
        <div className="chat-window active" id="chat-window">
          <div className="chat-header">
            <h3><i className="fas fa-robot"></i> Selvi Assistant</h3>
            <button className="chat-close" onClick={() => setOpen(false)}><i className="fas fa-times"></i></button>
          </div>
          <div className="chat-body" id="chat-body" ref={bodyRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.isBot ? 'bot' : 'user'}`}>
                {msg.text}
                {msg.options && msg.options.length > 0 && (
                  <div className="chat-options">
                    {msg.options.map(opt => (
                      <button key={opt} className="chat-option-btn" onClick={() => sendMessage(opt)}>{opt}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && sendMessage(input)}
            />
            <button className="chat-send" onClick={() => sendMessage(input)}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
