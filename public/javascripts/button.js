//Gum, zet kleur op wit
var eraser = function () {
    pencilColor = "white";
}

//Grotere lijn
var bigger = function () {
    if (pencilWidth < 26) {
        pencilWidth += 5;
    } else {
        pencilWidth = 26
    }
    buttonControl();
}

//Kleinere lijn
var smaller = function () {
    if (pencilWidth > 1) {
        pencilWidth -= 5;
    } else {
        pencilWidth = 1;
    }
    buttonControl();
}

//Show/hide size buttons
var buttonControl = function() {
    if(pencilWidth == 26) {
        $('#bigger').hide();
    } else {
        $('#bigger').show();
    }

    if (pencilWidth == 1) {
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
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    pencilColor = "black";
}
