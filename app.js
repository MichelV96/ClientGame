var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + 'public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var Room = require('./room.js');

app.use(express.static(__dirname + '/public'));

var index = require('./routes/index');
app.use('/', index);
var roomScreen = require('./routes/roomScreen');
app.use('/roomScreen', roomScreen);
var room = require('./routes/room');
app.use('/room', room);

server.listen(4200);

io.sockets.on('connection', function(client) {
    console.log("Client connected: " + client.id);

    client.on('join', function(data) {
        //nieuwe client is geconnect dus weer alle rooms alleen voor deze persoon ophalen
        client.emit('refreshRooms', Room.array);
    });
    //als iemand een room aanmaakt
    client.on('room', function(data) {
        //nieuwe room aanmaken
        var room = new Room.Room(data);
        //degene die de room aanmaakt joint de room
        client.emit('joinOwnRoom', Room.array.length-1);
        //voor ieder ander de rooms refreshen om te checken of die niet vol zit
        client.broadcast.emit('refreshRooms', Room.array);
    });

    //als iemand een room joint
    client.on('joinRoom', function(data){
        if(Room.array.length == 0 || Room.array[data.room] == undefined || Room.array[data.room].started){
            //kamer bestaat niet of is gestart dus weg
            client.emit("fullRoom");
        }else {
            var user = data.user;
            var room = data.room;
            //Controleren of de room niet vol zit | als er 4 spelers in zitten is de room vol
            if (Room.array[room].players.length == 4) {
                client.emit("fullRoom");
            } else {
                //de user zijn id pushen in de array
                Room.array[room].players.push(user);
                client.broadcast.emit('refreshRooms', Room.array);
            }
        }
    });
    //als iemand een chat bericht verstuurt
    client.on('chatBericht', function (data) {
        var message = data.message;
        var roomId = data.room;
        var user = data.user;
        console.log("HET WOORD IS: " + Room.array[roomId].woord);
        //controleren als de message overeen komt met het woord dat geraden moet worden en of de tekenaar het niet zegt
        if(message.toLowerCase() == Room.array[roomId].woord && user != Room.array[roomId].players[ Room.array[roomId].drawer]){
            console.log("HET WOORD IS GERADEN " + Room.array[roomId].score );
            clearInterval(Room.array[roomId].timer);
            Room.array[roomId].countdownSec = 120;
            Room.array[roomId].started = false;
            Room.array[roomId].nextDrawer();

            for(var i=0; i<Room.array[roomId].players.length; i++){
                io.to(Room.array[roomId].players[i]).emit("stopTimer", {word: message, user: user, points: Room.array[roomId].score });
            }
        }
        for(var i=0; i<Room.array[roomId].players.length; i++){
            io.to(Room.array[roomId].players[i]).emit("chat", message);
        }
    });

    client.on('leaveRoom', function (data) {
        var room = data.room;
        var user = data.user;
       //als het element bestaat in de array en checken of de room wel bestaat
       if(Room.array[room] != undefined && Room.array[room].players.indexOf(user) > -1){
           //verwijder het element uit de array
           Room.array[room].players.splice(Room.array[room].players.indexOf(user), 1);
           client.broadcast.emit('refreshRooms', Room.array);
       }
    });

    client.on('startGame', function (data) {
       Room.array[data].startGame(io);
        Room.array[data].started = true;
        for(var i=0; i<Room.array[data].players.length; i++){
            io.to(Room.array[data].players[i]).emit("startTimer", {drawer: Room.array[data].players[Room.array[data].drawer]});
        }
        console.log(Room.array[data].score);
    });

    client.on('tekenen', function (data) {
        var room = data.room;
        if(Room.array[room])
        for(var i=0; i<Room.array[room].players.length; i++){
            if(i != Room.array[room].drawer){
                io.to(Room.array[room].players[i]).emit("tekening", {x: data.x, y: data.y, color: data.color, size: data.size});
            }
        }
    });
});
