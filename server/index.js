const { Socket } = require("dgram");
const express = require("express");
const redisClient = require("./redis");
const { Server } = require("socket.io");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const server = require("http").createServer(app);
const authRouter = require("./routers/authRouter");
const session = require("express-session");
//not able to pass session to instantiate redisstore giving
const RedisStore = require("connect-redis").default;
require("dotenv").config();
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
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    credentials: false,
    name: "sid",
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production",
      httpOnly: true,
      expires: 1000 * 60 * 60 * 24 * 7,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    },
  })
);
app.use("/auth", authRouter);

// app.get("/", (req, res) => {
//   res.json("hi");
// });

io.on("connect", (Socket) => {});

server.listen(4000, () => {
  console.log("Server listing on port 4000");
});
