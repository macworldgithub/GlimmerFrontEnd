"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { BACKEND_URL } from "@/api/config";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(uuidv4());
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [showLeadForm, setShowLeadForm] = useState(false);
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ from: "bot", text: "Hi! How can I help you today?" }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
      console.log("34343")
    if (!input.trim()) return;
    const userMsg: { from: "user" | "bot"; text: string } = {
      from: "user",
      text: input,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post(`${BACKEND_URL}/chat/message`, {
        sessionId,
        message: input,
      });
      const botReply = res.data.reply;
      const botMsg: { from: "user" | "bot"; text: string } = {
        from: "bot",
        text: botReply,
      };
      setMessages((prev) => [...prev, botMsg]);
      if (/provide.*(name|email|phone)/i.test(botReply)) {
        setShowLeadForm(true);
      }
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Oops! Something went wrong." },
      ]);
    }
  };

  const submitLead = async () => {
    try {
      await axios.post(`${BACKEND_URL}/chat/lead`, lead);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Thanks! Our team will contact you soon." },
      ]);
      setShowLeadForm(false);
      setLead({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error saving your info. Try again later." },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="fixed bottom-6 right-20 z-40">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-purple-700 transition-all duration-300"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-3 w-[360px] max-h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden"
          >
            <div className="bg-purple-600 text-white px-4 py-3 font-semibold text-lg rounded-t-2xl">
              Glimmer Assistant
            </div>

            <div className="flex-1 px-3 py-2 overflow-y-auto text-sm scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`my-1 ${
                    msg.from === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block px-3 py-1 rounded-xl max-w-[80%] ${
                      msg.from === "user" ? "bg-purple-100" : "bg-gray-100"
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}

              {/* Lead Form */}
              {showLeadForm && (
                <div className="my-3 space-y-2 text-sm">
                  <input
                    type="text"
                    className="w-full px-3 py-1 border rounded-full"
                    placeholder="Your Name"
                    value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  />
                  <input
                    type="email"
                    className="w-full px-3 py-1 border rounded-full"
                    placeholder="Your Email"
                    value={lead.email}
                    onChange={(e) =>
                      setLead({ ...lead, email: e.target.value })
                    }
                  />
                  <input
                    type="tel"
                    className="w-full px-3 py-1 border rounded-full"
                    placeholder="Your Phone"
                    value={lead.phone}
                    onChange={(e) =>
                      setLead({ ...lead, phone: e.target.value })
                    }
                  />
                  <button
                    className="w-full px-3 py-1 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                    onClick={submitLead}
                  >
                    Submit
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            {!showLeadForm && (
              <div className="border-t px-2 py-2 flex items-center">
                <input
                  type="text"
                  className="flex-1 px-3 py-1 text-sm border rounded-full focus:outline-none focus:ring"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={sendMessage}
                  className="ml-2 px-3 py-1 text-sm bg-purple-600 text-white rounded-full hover:bg-purple-700"
                >
                  Send
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
