const wrap = document.getElementById('wrap');

$("#load").click(function () {
});

$("#save").click(function () {
    //$("#and").jsPlumb({target: "#andnot"});
});

$("#create").click(function () {
    $('#canvas').remove();
    let div = document.createElement('div');
    div.className = "ui-draggable ui-draggable-handle checkered";
    div.id = "canvas";
    wrap.append(div);//как сновы вызвать scale.js? я не знаю
    $("#canvas").draggable({});
    $(".aRedEndpoint").remove();
    $(".jtk-connector").remove();
});