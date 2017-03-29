$('#purple').click(function () {
    pencilColor = "purple";
    changePencil();
});

$('#blue').click(function () {
    pencilColor = "blue";
    changePencil();
});

$('#red').click(function () {
    pencilColor = "red";
    changePencil();
});

$('#green').click(function () {
    pencilColor = "green";
    changePencil();
});

$('#orange').click(function () {
    pencilColor = "orange";
    changePencil();
});

$('#yellow').click(function () {
    pencilColor = "yellow";
    changePencil();
});

$('#black').click(function () {
    pencilColor = "black";
    changePencil();
});

var changePencil = function() {
    $('#canvas').css("cursor", "url('../images/pencil.png'), pointer")
    lastPencilColor = pencilColor;
}