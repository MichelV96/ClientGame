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

io.on('connection', function(client) {
    console.log('Client connected: ' + client.id);

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
        if(Room.array.length == 0 || Room.array[data.room] == undefined){
            //kamer bestaat niet dus weg
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
       //controleren als de message overeen komt met het woord dat geraden moet wroden
        if(message.toLowerCase() == Room.array[roomId].woord ){
            console.log("HET WOORD IS GERADEN");
        }
        for(i=0; i<Room.array[roomId].players.length; i++){
            io.to(Room.array[roomId].players[i]).emit("chat", message);
        }
    });

});
