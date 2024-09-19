import { io } from "socket.io-client";

const socket = new io("localhost:4000", {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
