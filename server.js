const express = require('express');
const http = require('http').Server(express);
const io = require('socket.io')(http);
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, 'build'))); //production location of react

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

app.listen(3001, () => console.log(`listening on 3001`));

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
