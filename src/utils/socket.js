import { io } from "socket.io-client";

let socket;

export const createSocketConnection = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_BASE_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });
  }
  return socket;
};
