function set_zoom(zoom, instance, transformOrigin, el) {
    transformOrigin = transformOrigin || [0.0, 0.0];
    instance = instance || jsPlumb;
    el = el || instance.getContainer();
    var p = ["webkit", "moz", "ms", "o"],
            s = "scale(" + zoom + ")",
            oString = (transformOrigin[0] * 100) + "% " + (transformOrigin[1] * 100) + "%";
    for (var i = 0; i < p.length; i++) {
        el.style[p[i] + "Transform"] = s;
        el.style[p[i] + "TransformOrigin"] = oString;
    }
    el.style["transform"] = s;
    el.style["transformOrigin"] = oString;
    instance.setZoom(zoom);
    check_bounds(true);
}
function check_bounds(zoom) {
    var canvas = $('#canvas');
    var wrap = $('#wrap');
    var position = canvas.position();
    var wdtWrap = wrap.width(), wdtCanvas = canvas.width(), hgtWrap = wrap.height(), hgtCanvas = canvas.height();
    var checked_y = position.left;
    //проверяем пределы
    checked_y = Math.min(checked_y, 0);
    checked_y = Math.max(checked_y, -(wdtCanvas * scale - wdtWrap));
    var checked_x = position.top;
    //проверяем пределы
    checked_x = Math.min(checked_x, 0);
    checked_x = Math.max(checked_x, -(hgtCanvas * scale - hgtWrap));
    // добавляем разницу к предыдущим координатам
    if (!zoom) {
        $('#canvas').css({top: checked_x, left: checked_y});
    } else {
        $('#canvas').animate({top: checked_x, left: checked_y}, 200);
    }
}