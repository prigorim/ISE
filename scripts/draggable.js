document.onclick = function () {
    $(function () {
        const canvas = $('#canvas');
        $(canvas).draggable({});
        $('#elements_pallet .element').draggable({
            appendTo: '#canvas',
            revert: 'invalid',
            helper: () => new Element(),
            zIndex: 99
        });
        $(canvas).droppable({
            accept: '#elements_pallet .element',
            drop: function (e, ui) {
                const element = $(document.createElement(
                    'table',
                    {is: ui.draggable[0].getAttribute('is')})
                ).css({
                    position: 'absolute',
                    left: ui.position.left - ui.position.left % 15,
                    top: ui.position.top - ui.position.top % 15,
                    margin: 0,
                }).prependTo($(canvas));
                jsPlumbInstance.draggable(
                    element, {
                        containment: 'parent',
                        grid: [15, 15]
                    })
            }
        });
    });
};