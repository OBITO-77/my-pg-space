import { useState } from "react";
import { Send } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there! 👋 Looking for a PG? Just ask me!" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMsg = { from: "user", text: input.trim() };
    setMessages([...messages, newMsg]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/api/chatbot/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input.trim() }),
      });

      const data = await res.json();
      const botReplies = data.replies || ["Sorry, I didn't understand that."];

      setMessages((prev) => [
        ...prev,
        ...botReplies.map((text) => ({ from: "bot", text })),
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Something went wrong, please try again 😓" },
      ]);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="bg-[#023047] text-white p-3 rounded-full shadow-lg hover:bg-[#219EBC]"
        >
          💬
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden border z-50">
          <div className="bg-[#023047] text-white p-3 font-bold">
            MyPGSpace Bot
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm flex flex-col">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.from === "bot"
                    ? "bg-[#8ECAE6] self-start"
                    : "bg-[#FFB703] self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex p-2 border-t items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-xl text-sm mr-2"
            />
            <button
              onClick={sendMessage}
              className="text-[#023047] hover:text-[#219EBC]"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
