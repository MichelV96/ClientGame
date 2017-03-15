var rooms = [];

var Room = function(name) {
    this.name = name;
    this.player = 0;

    rooms.push(this);
};

module.exports.Room = Room;
module.exports.array = rooms;