var i = 0;
document.onclick = function () {
    $(function () {
        const canvas = $("#canvas");
        $(canvas).draggable({});
        $(".logic-element").draggable({
            appendTo: "#canvas",
            revert: 'invalid',
            helper: "clone",
        });
        $("#canvas").droppable({
            accept: "#and, #or, #andnot, #ornot, #not, #xor, #counter, #counter_, #analyzer1, #analyzer2",
            drop: function (ev, ui) {
                let x = ui.position.left / 15;
                let y = ui.position.top / 15;
                let correctedX = Math.ceil(x) * 15;
                let correctedY = Math.ceil(y) * 15;
                $(ui.draggable).clone().prependTo(this)
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
                        zIndex: 1,
                        margin: 0,
                    });
                i = i + 1;
            }

        });

    });
};