"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { BACKEND_URL } from "@/api/config";
import { WhatsAppOutlined } from "@ant-design/icons";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

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

  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight;
      setViewportHeight(vh);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial height

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sendMessage = async () => {
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
      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
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
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
            style={{
              maxHeight: viewportHeight ? viewportHeight * 0.3 : "80vh",
              height: "auto",
            }}
            className="w-[95vw] sm:w-[360px] min-h-[300px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-purple-600 text-white px-5 py-4 text-lg font-semibold rounded-t-2xl">
              Glimmer Assistant
            </div>

            {/* Chat Messages */}
            <div className="flex-1 px-3 py-2 overflow-y-auto text-sm space-y-1 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-xl max-w-[85%] ${
                      msg.from === "user" ? "bg-purple-100" : "bg-gray-100"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Lead Form */}
              {showLeadForm && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2 mt-3"
                >
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-full text-sm focus:outline-purple-500"
                    placeholder="Your Name"
                    value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                  />
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-full text-sm focus:outline-purple-500"
                    placeholder="Your Email"
                    value={lead.email}
                    onChange={(e) =>
                      setLead({ ...lead, email: e.target.value })
                    }
                  />
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border rounded-full text-sm focus:outline-purple-500"
                    placeholder="Your Phone"
                    value={lead.phone}
                    onChange={(e) =>
                      setLead({ ...lead, phone: e.target.value })
                    }
                  />
                  <button
                    className="w-full py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                    onClick={submitLead}
                  >
                    Submit
                  </button>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            {!showLeadForm && (
              <div className="border-t px-3 py-3 flex flex-wrap sm:flex-nowrap items-center gap-2 bg-white">
                <input
                  type="text"
                  className="flex-1 min-w-0 px-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 text-sm bg-purple-600 text-white rounded-full hover:bg-purple-700 transition w-full sm:w-auto"
                >
                  Send
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <div
        className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-md flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        onClick={() => window.open("https://wa.me/923312062376", "_blank")}
      >
        <WhatsAppOutlined style={{ fontSize: "26px" }} />
      </div>
    </div>
  );
}
