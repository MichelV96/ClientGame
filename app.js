var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var Room = require('./room.js');

var index = require('./routes/index');
app.use('/', index);
var roomScreen = require('./routes/roomScreen');
app.use('/roomScreen', roomScreen);
var room = require('./routes/room');
app.use('/room', room);

server.listen(4200);

io.on('connection', function(client) {
    console.log('Client connected: ' + client.id);

    client.on('join', function(data) {
        console.log(data);
        //nieuwe client is geconnect dus weer alle rooms alleen voor deze persoon ophalen
        client.emit('refreshRooms', Room.array);
    });
    //als iemand een room aanmaakt
    client.on('room', function(data) {
        //nieuwe room aanmaken
        var room = new Room.Room(data);
        //voor iedereen de rooms opnieuw ophalen
        client.emit('joinOwnRoom', Room.array.length-1);
        client.broadcast.emit('refreshRooms', Room.array);
    });
    //als iemand een room joint
    client.on('joinRoom', function(data){
        Room.array[data].player = parseInt(Room.array[data].player) + 1;
        //weer alle rooms refreshen want je wilt niet een room laten zien die vol is
        client.broadcast.emit('refreshRooms', Room.array);
    });
});
