import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { id, firstname } = useParams();
  const toUserId = id;

  const user = useSelector((store) => store.user);
  const fromUserId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const chatContainerRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!fromUserId || !toUserId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    console.log("Joining room with:", fromUserId, toUserId);

    socket.emit("joinChat", {
      fromUserId,
      toUserId,
    });

    socket.on("receiveMessage", (message) => {
      console.log("Received:", message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [fromUserId, toUserId]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      fromUserId,
      toUserId,
      text: newMessage,
      firstname: user.firstName,
    });

    setNewMessage("");
  };

  return (
    <div className="w-[95%] mx-auto mt-5">
      <h1 className="font-semibold text-xl mb-3">Chat with {firstname}</h1>

      <div className="relative h-[70vh] border rounded-xl bg-base-200 flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
          {messages.length === 0 && (
            <p className="text-center text-gray-400 mt-10">
              Start the conversation 👋
            </p>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat ${
                msg.senderId === fromUserId ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-header text-sm text-gray-400">
                {msg.firstname}
              </div>

              <div
                className={`chat-bubble ${
                  msg.senderId === fromUserId
                    ? "bg-primary text-white"
                    : "bg-base-300"
                }`}
              >
                {msg.text}
              </div>

              <div className="chat-footer text-xs opacity-50">{msg.time}</div>
            </div>
          ))}

          <div ref={chatContainerRef}></div>
        </div>

        <div className="flex border-t bg-base-100">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 p-3 outline-none"
            type="text"
            placeholder="Type something..."
          />

          <button
            onClick={handleSend}
            className="btn rounded-none rounded-br-xl border-0"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
