import express from "express";
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile('index.html');
});


// Socket Connection
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    })

    
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });


});

server.listen(9000, () => {
    console.log("Server is running on port 9000");
});