// socketController.js
const { Server } = require("socket.io");

const initWebSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", 
      methods: ["GET", "POST"], 
      allowedHeaders: ["Content-Type"], 
      credentials: true, 
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });

    socket.on('message', (data) => {
      console.log("Message received:", data);
    });
  });
};

module.exports = { initWebSocket }; 
