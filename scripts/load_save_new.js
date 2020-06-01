const wrap = document.getElementById('wrap');

$("#load").click(function () {
    alert(2);
});

$("#save").click(function () {
    alert(1);
    $("#and").jsPlumb({target: "#andnot"});
});

$("#create").click(function () {
    alert(3);
    $('#canvas').remove();
    let div = document.createElement('div');
    div.className = "ui-draggable ui-draggable-handle checkered";
    div.id = "canvas";
    wrap.append(div);//как сновы вызвать scale.js? я не знаю
    $("#canvas").draggable({});
});