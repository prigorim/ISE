const wrap = document.getElementById('wrap');

$("#load").click(function () {
$('#canvas').remove();
    let div = document.createElement('div');
    div.className = "ui-draggable ui-draggable-handle checkered";
    div.id = "canvas";
    wrap.append(div);
    $("#canvas").draggable({});
});

$("#save").click(function () {
a = document.createElement("a")
a.setAttribute("href", "data:text/plain," + canvas.innerHTML)
a.setAttribute("download", "scheme.txt")
save.onclick = function(){ a.click() }

});

$("#create").click(function () {
    $('#canvas').remove();
    let div = document.createElement('div');
    div.className = "ui-draggable ui-draggable-handle checkered";
    div.id = "canvas";
    wrap.append(div);
    $("#canvas").draggable({});
});