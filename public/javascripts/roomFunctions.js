var reset = 0;
var countdownSec = 120;
var stop = false;
var score = 50;
var scoredisplay = 0;
var p1 = 0;
var p2 = 0;
var p3 = 0;
var p4 = 0;
var userId;
var roomId = location.search.split('roomid=')[1];
var medals = ["goldmedal.png", "silvermedal.png", "bronzemedal.png", "nomedal.png"];

$("#startknop").click(function () {
    socket.emit('startGame', roomId);
    stop = false;
});
function start() {
    var min = Math.floor(countdownSec / 60);
    var sec = countdownSec % 60;
    if(countdownSec != 0 && !stop) {
        if (reset == 0) {
            setTimeout(function () {
                countdownSec--;
                score = (score - 0.4).toFixed(2);
                scoredisplay = Math.floor(score);
                socket.emit('tekenen', {room: roomId, x: ArrayX, y: ArrayY, color: ArrayColor, size: ArraySize, dragg: Draggable});
                start();
            }, 1000);
            document.getElementById("output").innerHTML = "Time left: 0" + min + ":" + sec + "<br> Points: " + scoredisplay;
        } else {
            window.setTimeout(function () {
                countdownSec = 120;
                score = 50;
                scoredisplay = 0;
                reset = 0;
                alert("time's up");
                start();
            }, 5000);
        }
    }
}

$("#chat_form").submit(function (e) {
    e.preventDefault();
    //de value uit de textarea halen en kijken of er iets in zit
    var message = $("#message").val();
    if (message.length > 0) {
        //chat bericht naar de server sturen
        socket.emit('chatBericht', {message: message, room: roomId, user: userId});
    }
    //textarea weer leeg zetten
    document.getElementById('message').value = "";
});

$(window).bind('beforeunload', function () {
    socket.emit('leaveRoom', {user: userId, room: roomId});
});

function setRoomData(data){
    var drawer = data['players'][data.drawer];

    if(drawer == userId){
        $("#startknop").css("display", "unset");
    }else{
        $("#startknop").css("display", "none");
    }

    //score en spelers leegmaken
    $("#scores").empty();
    for (var i=0; i<data['players'].length; i++){
        if(i == data.drawer){
            $("#scores").append("<img src='images/"+medals[i]+"'>" + " <b style='color:red'>" + data['players'][i] + "</b>");
        }else{
            $("#scores").append("<img src='images/"+medals[i]+"'>" + " " + data['players'][i]);
        }
        $("#scores").append("</br>");
    }
}