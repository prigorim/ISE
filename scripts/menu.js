$(document).ready(function () {
    $('.switch').click(function () {
        $(this).toggleClass("switchOn");
        $('#canvas').toggleClass('checkered');
    });
});