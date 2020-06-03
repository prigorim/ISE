document.onclick = function () {
    $(function () {
        const canvas = $("#canvas");
        $(canvas).draggable({});
        $(".logic-element").draggable({
            appendTo: "#canvas",
            revert: 'invalid',
            helper: () => new LogicElement(),
            zIndex: 99
        });
        $(canvas).droppable({
            accept: ".logic-element",
            drop: function (e, ui) {
                $(document.createElement(
                    'table',
                    {is: ui.draggable[0].getAttribute('is')})
                ).css({
                    position: 'absolute',
                    left: ui.position.left - ui.position.left % 15,
                    top: ui.position.top - ui.position.top % 15,
                    zIndex: 10
                }).draggable({
                    grid: [15, 15],
                    containment: 'parent',
                }).prependTo(this);
            }

        });

    });
};