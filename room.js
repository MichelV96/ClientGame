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
]

var Room = function(name) {
    this.name = name;
    this.players = [];

    var random = Math.floor((Math.random()*WordEnum.length)+1);
    this.woord = WordEnum[random];
    rooms.push(this);
};

module.exports.Room = Room;
module.exports.array = rooms;