let i = 1;

document.onclick = function () {
    $(function () {
        $("#canvas").draggable({
        });
        $("#and").draggable({
            start: function (event, ui) {
                $(this).removeClass('elements_color').css('z-index', '49');
            },
            appendTo: "#canvas",
            revert: 'invalid',
            helper: "clone",
        });
        $("#or").draggable({
            start: function (event, ui) {
                $(this).removeClass('elements_color').css('z-index', '49');
            },
            appendTo: "#canvas",
            revert: 'invalid',
            helper: "clone",
            snap: "#canvas",
        });
        $("#ornot").draggable({
            start: function (event, ui) {
                $(this).removeClass('elements_color').css('z-index', '49');
            },
            appendTo: "#canvas",
            revert: 'invalid',
            helper: "clone",
            snap: "#canvas",
        });
        $("#andnot").draggable({
            start: function (event, ui) {
                $(this).removeClass('elements_color').css('z-index', '49');
            },
            appendTo: "#canvas",
            revert: 'invalid',
            helper: "clone",
            snap: "#canvas",
        });
        $("#not").draggable({
            start: function (event, ui) {
                $(this).removeClass('elements_color').css('z-index', '49');
            },
            appendTo: "#canvas",
            revert: 'invalid',
            helper: "clone",
            snap: "#canvas",
        });
        $("#xor").draggable({
            start: function (event, ui) {
                $(this).removeClass('elements_color').css('z-index', '49');
            },
            appendTo: "#canvas",
            revert: 'invalid',
            helper: "clone",
            snap: "#canvas",
        });
        $("#counter").draggable({
            start: function (event, ui) {
                $(this).removeClass('elements_color');
            },
            appendTo: "#canvas",
            revert: 'invalid',
            helper: "clone",
            snap: "#canvas",
        });
        $("#counter_").draggable({
            start: function (event, ui) {
                $(this).removeClass('elements_color');
            },
            appendTo: "#canvas",
            revert: 'invalid',
            helper: "clone",
            snap: "#canvas",
        });
        $("#trash").droppable({
            hoverClass: "opacity_trash",
            accept: '.added_element',
            drop: function (ev, ui) {
                $(ui.draggable).remove()
            }
        });
        $("#canvas").droppable({
            accept: "#and, #or, #andnot, #ornot, #not, #xor, #counter, #counter_",
            drop: function (ev, ui) {
                let x = ui.position.left / 15;
                let y = ui.position.top / 15;
                let correctedX = Math.ceil(x) * 15;
                let correctedY = Math.ceil(y) * 15;
                let dropped = $(ui.draggable).clone()
                    .appendTo(this)
                    .removeClass()
                    .addClass('added_element')
                    .removeAttr('id')
                    .draggable({
                        grid: [15, 15],
                        containment: 'parent',
                    })
                    .attr("id", 'log_' + i)
                    .css({
                        left: correctedX,
                        top: correctedY,
                        zIndex: 10
                    });
                dropped[0].querySelectorAll('.line_wrapper').forEach(line => jsPlumb.addEndpoint(line,
                    {anchor: "Top"},
                    {isSource: true, isTarget: true}));
                i = i + 1;
            }

        });

    });
};