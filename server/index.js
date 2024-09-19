const express = require("express");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const server = require("http").createServer(app);
const authRouter = require("./routers/authRouter");
const {
  corsConfig,
  sessionMiddleware,
  wrap,
} = require("./controllers/serverController");
const {
  authorizeUser,
  addFriend,
  initializeUser,
  onDisconnect,
  dm,
} = require("./controllers/socketController");

const io = new Server(server, {
  cors: corsConfig,
});

//middle ware
app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(sessionMiddleware);
app.use("/auth", authRouter);

io.use(wrap(sessionMiddleware));
//authorize the user to use socket
io.use(authorizeUser);
io.on("connect", (socket) => {
  initializeUser(socket);

  socket.on("add_friend", (friendName, cb) => {
    addFriend(socket, friendName, cb);
  });

  socket.on("dm", (message) => {
    dm(socket, message);
  });

  socket.on("disconnect", () => onDisconnect(socket));
});

server.listen(4000, () => {
  console.log("Server listing on port 4000");
});
