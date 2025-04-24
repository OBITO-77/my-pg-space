import { useEffect } from "react";

const ChatbotAI = () => {
  useEffect(() => {
    // 1. Create a script element
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js"; // or the URL from your snippet
    script.async = true; // load asynchronously
    script.onload = () => {
      // 3. Initialize Chatbase after script loads
      window.Chatbase?.init({
        agentId: "cxCIe3YaS7nvIPyET_8-W", // replace with your agent’s ID
        container: "#chatbase-container", // CSS selector for the div
      });
    };

    // 2. Append script to body
    document.body.appendChild(script);

    // 4. Cleanup on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="chatbase-container" style={{ width: "100%", height: "500px" }}>
      {/* Chat UI will be injected here */}
    </div>
  );
};

export default ChatbotAI;
