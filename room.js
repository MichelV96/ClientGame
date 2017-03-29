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
    this.started = false;
    this.drawer = 0;
    this.score = 50;

    var random = Math.floor((Math.random()*WordEnum.length));
    this.woord = WordEnum[random];

    this.countdownSec = 120;

    var _this = this;

    this.startGame = function (io){
       this.timer = setInterval(function () {
           _this.countdownSec--;
            _this.score = (_this.score - 0.4).toFixed(2);
            //console.log(_this.countdownSec);
           if(_this.countdownSec == 0){
               clearInterval(this);
               for(var i=0; i<_this.players.length; i++){
                   io.to(_this.players[i]).emit("stopTimer");
               }
               _this.countdownSec = 120;
               _this.started = false;
               _this.nextDrawer();
           }
        }, 1000)
    };

    this.nextDrawer = function(){
        random = Math.floor((Math.random()*WordEnum.length));
        _this.woord = WordEnum[random];
        _this.score = 50;
        if(_this.drawer == _this.players.length -1) {
            _this.drawer = 0;
        }else{
            _this.drawer = _this.drawer + 1;
        }
    };

    rooms.push(this);
};

module.exports.Room = Room;
module.exports.array = rooms;