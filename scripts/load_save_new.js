const wrap = document.getElementById('wrap');

$("#load").click(function () {
});

$("#save").click(function () {
});

$("#create").click(function () {
    $('#canvas').remove();
    let div = document.createElement('div');
    div.className = "ui-draggable ui-draggable-handle checkered";
    div.id = "canvas";
    wrap.append(div);
    $("#canvas").draggable({});
});