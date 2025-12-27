import { useEffect, useState } from "react";
import io from "socket.io-client";
const username = prompt("Enter your name");

const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

 useEffect(() => {
  const handleMessage = (data) => {
    setChat((prev) => [...prev, data]);
  };

  socket.on("receive_message", handleMessage);

  return () => {
    socket.off("receive_message", handleMessage);
  };
}, []);


 const sendMessage = () => {
  if (message.trim() === "") return;

  socket.emit("send_message", {
    user: username,
    text: message
  });

  setMessage("");
};


  return (
    <div style={{ padding: "20px" }}>
      <h2>Live Chat</h2>

       

      <input
        placeholder="Type message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>

      <div style={{ marginTop: "20px" }}>
        {chat.map((msg, index) => (
          <p key={index}>
  <b>{msg.user}:</b> {msg.text}
</p>

        ))}
      </div>
    </div>
  );
}

export default App;



