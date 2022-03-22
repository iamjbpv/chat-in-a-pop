require("dotenv").config();
const express = require("express");
const http = require("http").Server(express);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const path = require("path");
const port = process.env.PORT || 3333;
const http_port= process.env.HTTP_PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, "build"))); //production location of react

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log(msg);

    io.emit("chat message", msg);
  });

  // reaction message
  socket.on("reaction message", (msg) => {
    console.log(msg);
    io.emit("reaction message", msg);
  });
});

app.listen(http_port, () => console.log(`listening on ${http_port}`));

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
