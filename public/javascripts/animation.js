$('.colorSquare').click(function () {
    colorAnimation(this);
});

var colorAnimation = function(color) {
    $('.colorSquare').fadeTo("fast", 1);
    $(color).fadeTo("slow", 0.25);
}