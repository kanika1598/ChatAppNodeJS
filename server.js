const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);



app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.use(express.static('public'));


io.on('connection', function (socket) {
    console.log('Connected!');

    socket.on('message', function (msg) {
        socket.broadcast.emit('message', msg);
    })
})




http.listen(3000, function () {
    console.log("Chat Application is all Set Up!");
})