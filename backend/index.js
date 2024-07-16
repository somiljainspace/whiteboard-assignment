const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the cors middleware

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 4000;

// Use the cors middleware to allow requests from localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the server' }); // Change the message here
});

io.on('connection', (socket) => {
    console.log('New client connected');

    // Emit a message to the client on connection
    socket.emit('FromAPI', 'WHITE BOARD');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
