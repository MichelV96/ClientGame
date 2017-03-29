//Breedte en hoogte van de canvas
var canvasWidth = 900;
var canvasHeight = 400;

//Maak arrays aan voor de lijnen
var ArrayX = [];
var ArrayY = [];
var Draggable = [];
var ArrayColor = [];
var ArraySize = [];

//Maak een boolean paint
var paint;

//Standaard instellingen voor tekenen
var pencilColor = "black";
var pencilShape = "round";
var pencilWidth = 20;

//Aanmaken van het canvas
var canvasDiv = document.getElementById('canvasDiv');
canvas = document.createElement('canvas');
canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);
canvas.setAttribute('id', 'canvas');
canvasDiv.appendChild(canvas);
if (typeof G_vmlCanvasManager != 'undefined') {
    canvas = G_vmlCanvasManager.initElement(canvas);
}
context = canvas.getContext("2d");

//Wanneer muis is ingedrukt
$('#canvas').mousedown(function (e) {
    //Bepaal positie van de muis
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    //Zet paint op true
    paint = true;
    createLine(mouseX, mouseY, false);
    DrawOnCanvas();
});

//Wanneer de muis beweegt, en muis ingedrukt is, roep de teken methode aan
$('#canvas').mousemove(function (e) {
    if (paint) {
        //Bepaal positie van de muis
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        createLine(mouseX, mouseY, true);
        DrawOnCanvas();
    }
});

//Wanneer de muis losgeloten wordt, zet paint op false
$('#canvas').mouseup(function (e) {
    paint = false;
});

//Wanneer de muis buiten de canvas gaat, zet paint op false
$('#canvas').mouseleave(function (e) {
    paint = false;
});

//Maak een json object van een lijn en zet deze in een array
var createLine = function (x, y, draggable) {
    ArrayX.push(x);
    ArrayY.push(y);
    Draggable.push(draggable);
    ArrayColor.push(pencilColor);
    ArraySize.push(pencilWidth);
}

//Tekenen op het canvas
var DrawOnCanvas = function () {
    //Zet de positie op 0
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    //Vorm van de lijn(round, square, triangle etc.)
    context.lineJoin = pencilShape;

    //Haal het aantal kliks uit de array en teken
    for (var i = 0; i < ArrayX.length; i++) {

        //Geef kleur en dikte mee
        context.strokeStyle = ArrayColor[i];
        context.lineWidth = ArraySize[i];

        //Begin van de lijn
        context.beginPath();
        if (Draggable[i] && i) {
            context.moveTo(ArrayX[i - 1], ArrayY[i - 1]);
        } else {
            context.moveTo(ArrayX[i] - 1, ArrayY[i] - 1);
        }

        //Stel de coordinaten in voor het trekken van de lijn


        //Tekenen van de lijn
        context.lineTo(ArrayX[i], ArrayY[i]);
        context.closePath();
        context.stroke();
    }
};
