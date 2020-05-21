const pluse_scale = document.getElementById("pluse_scale");
const minus_scale = document.getElementById("minus_scale");
var scale = 1;

window.onkeydown = function (evt) {
    if (evt.ctrlKey) {
        alert('no scale')
        return false;
    }
};

pluse_scale.onclick = function () {
    if (scale < 2) {
        scale += 0.1;
        canvas.style.zoom = canvas.style.WebkitZoom = canvas.style.MsZoom = scale;
    }
}

minus_scale.onclick = function () {
    if (scale > 0.3) {
        scale -= 0.1;
        canvas.style.zoom = canvas.style.WebkitZoom = canvas.style.MsZoom = scale;
    }
}

function addOnWheel(elem, handler) {
    if (elem.addEventListener) {
        if ('onwheel' in document) {
            // IE9+, FF17+
            elem.addEventListener("wheel", handler);
        }
    }
}

addOnWheel(canvas, function (e) {

    var delta = e.deltaY || e.detail || e.wheelDelta;

    // отмасштабируем при помощи CSS
    if (delta < 0)
        if (scale < 2) {
            scale += 0.1;
            canvas.style.zoom = canvas.style.WebkitZoom = canvas.style.MsZoom = scale;
        }
    if (delta > 0)
        if (scale > 0.3) {
            scale -= 0.1;
            canvas.style.zoom = canvas.style.WebkitZoom = canvas.style.MsZoom = scale;
        }
    // отменим прокрутку
    e.preventDefault();
});
