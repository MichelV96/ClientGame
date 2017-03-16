var rooms = [];

var Room = function(name) {
    this.name = name;
    this.players = [];

    rooms.push(this);
};

module.exports.Room = Room;
module.exports.array = rooms;