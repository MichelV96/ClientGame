//Gum, zet kleur op wit
var eraser = function () {
    pencilColor = "white";
    $('#canvas').css("cursor", "url('../images/eraser.png'), pointer")
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
    if (pencilWidth > 10) {
        pencilWidth -= 10;
    } else {
        pencilWidth = 10;
    }
    buttonControl();
}

//Show/hide size buttons
var buttonControl = function() {
    if(pencilWidth == 100) {
        $('#bigger').css('background-color', 'red');
        $('#bigger').css('color', 'white');
        $('#bigger').css('border-color', 'white');
    } else {
        $('#bigger').css('background-color', '#1561b4')
        $('#bigger').css('color', '#f09294')
        $('#bigger').css('border-color', '#f09294')
    }

    if (pencilWidth == 10) {
        $('#smaller').css('background-color', 'red');
        $('#smaller').css('color', 'white');
        $('#smaller').css('border-color', 'white');
    } else {
        $('#smaller').css('background-color', '#1561b4')
        $('#smaller').css('color', '#f09294')
        $('#smaller').css('border-color', '#f09294')
    }

    changeDot();
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
    colorAnimation('#black');
}


var changeDot = function() {
    dotSize = pencilWidth / 10;
    $('#dotSize').text(dotSize + "/" + dotMaxSize);
}
