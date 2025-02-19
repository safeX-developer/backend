const { Server } = require("socket.io");
// const { PokerGame } = require("../controllers/poker.controller");

async function createsocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5174"]
    },
  });
  // new PokerGame(io);
}

module.exports = { createsocket }
