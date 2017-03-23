var rooms = [];
var WordEnum = [
    "fiets",
    "wetboek",
    "regendans",
    "snor",
    "parkeermeter",
    "theater",
    "koning",
    "invalide",
    "vliegdekschip",
    "nederland"
];

var Room = function(name) {
    this.name = name;
    this.players = [];

    this.drawer = 0;
    this.lines = [];

    var random = Math.floor((Math.random()*WordEnum.length));
    this.woord = WordEnum[random];

    var countdownSec = 120;
    var roundScore = 100000000;

    this.startTimer = function (io, players){
        setInterval(function () {
            countdownSec--;
            console.log(countdownSec);
            for(var i=0; i<players.length; i++){
                if(i != this.drawer){
                    io.to(players[i]).emit("tekening", this.lines);
                }
            }
        }, 1000);
    };
    rooms.push(this);
};

module.exports.Room = Room;
module.exports.array = rooms;