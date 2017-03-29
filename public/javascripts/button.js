//Gum, zet kleur op wit
var eraser = function () {
    pencilColor = "white";
    $('#canvas').css("cursor", "url('../images/eraserBig.png'), pointer")
}

//Grotere lijn
var bigger = function () {
    if (pencilWidth < 90) {
        pencilWidth += 10;
    } else {
        pencilWidth = 100
    }
    buttonControl();
}

//Kleinere lijn
var smaller = function () {
    if (pencilWidth > 30) {
        pencilWidth -= 10;
    } else {
        pencilWidth = 20;
    }
    buttonControl();
}

//Show/hide size buttons
var buttonControl = function() {
    if(pencilWidth == 100) {
        $('#bigger').hide();
    } else {
        $('#bigger').show();
    }

    if (pencilWidth == 20) {
        $('#smaller').hide();
    } else {
        $('#smaller').show();
    }
}


//Clear het canvas en maak array leeg
var clearCanvas = function () {
    ArrayX = [];
    ArrayY = [];
    ArrayColor = [];
    ArraySize = [];
    Draggable = [];
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    pencilColor = "black";
    pencilWidth = 20;
}
