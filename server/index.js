const { Socket } = require("dgram");
const express = require("express");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const server = require("http").createServer(app);
const authRouter = require("./routers/authRouter");

const io = new Server(server, {
  cosrs: {
    origin: "http://localhost:5173",
    credentials: "true",
  },
});

//middle ware
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/auth", authRouter);

// app.get("/", (req, res) => {
//   res.json("hi");
// });

io.on("connect", (Socket) => {});

server.listen(4000, () => {
  console.log("Server listing on port 4000");
});
