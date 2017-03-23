//Breedte en hoogte van de canvas
var canvasWidth = 250;
var canvasHeight = 250;

//Maak array aan voor de lijnen
var lines = [];

//Maak een boolean paint
var paint;

//Standaard instellingen voor tekenen
var pencilColor = "black";
var pencilShape = "round";
var pencilWidth = 11;

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
    createLine(mouseX, mouseY);
    DrawOnCanvas(lines);
});

//Wanneer de muis beweegt, en muis ingedrukt is, roep de teken methode aan
$('#canvas').mousemove(function (e) {
    if (paint) {
        //Bepaal positie van de muis
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        createLine(mouseX, mouseY);
        DrawOnCanvas(lines);
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
var createLine = function (x, y) {
    var line = {"x": x, "y": y, "color": pencilColor, "size": pencilWidth};
    lines.push(line);
};

//Tekenen op het canvas
var DrawOnCanvas = function (lines) {
    //Zet de positie op 0
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    //Vorm van de lijn(round, square, triangle etc.)
    context.lineJoin = pencilShape;

    //Haal het aantal kliks uit de array en teken
    for (var i = 0; i < lines.length; i++) {

        //Geef kleur en dikte mee
        context.strokeStyle = lines[i].color;
        context.lineWidth = lines[i].size;

        //Begin van de lijn
        context.beginPath();

        //Stel de coordinaten in voor het trekken van de lijn
        context.moveTo(lines[i].x - 1, lines[i].y - 1);

        //Tekenen van de lijn
        context.lineTo(lines[i].x, lines[i].y);
        context.closePath();
        context.stroke();
    }
};

