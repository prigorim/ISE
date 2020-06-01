const load = document.getElementById("load");
const save = document.getElementById("save");
const create = document.getElementById("create");
const wrap = document.getElementById('wrap');

load.onclick = function () {
    alert(2);
}
save.onclick = function () {
    alert(1);
    $("#and").plumb({target: 'andnot'});
}

create.onclick = function () {
    alert(3);
    $('#canvas').remove();
    let div = document.createElement('div');
    div.className = "ui-draggable ui-draggable-handle checkered";
    div.id="canvas";
    wrap.append(div);//как сновы вызвать функцию scale? я не знаю
}