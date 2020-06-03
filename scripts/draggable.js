let i = 0;

document.onclick = function () {
    $(function () {
        jsPlumb.setContainer($("#canvas"));
        $("#canvas").draggable({});
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
        $("#analyzer1").draggable({
            start: function (event, ui) {
                $(this).removeClass('elements_color');
            },
            appendTo: "#canvas",
            revert: 'invalid',
            helper: "clone",
            snap: "#canvas",
        });
        $("#analyzer2").draggable({
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
                $(ui.draggable).remove();
               //$(".aRedEndpoint").remove();
               //$(".jtk-connector").remove();
            }
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
                        zIndex: 1
                    });
                let container = document.querySelector("#log_" + i);
                //alert(container);
                container.querySelectorAll('.input_logic > .line_logic')
                    .forEach(line => jsPlumb
                        .addEndpoint(line, {
                                endpoint: ["Dot", {radius: 4}],
                                cssClass: "aRedEndpoint",
                                anchor: "Left",
                                connector: "Flowchart"
                            },
                            {
                                isSource: true,
                                isTarget: true
                            })
                    );
                container.querySelectorAll('.output_logic > .line_logic')
                    .forEach(line => jsPlumb
                        .addEndpoint(line, {
                                endpoint: ["Dot", {radius: 4}],
                                cssClass: "aRedEndpoint",
                                anchor: "Right",
                                connector: "Flowchart"
                            },
                            {isSource: true, isTarget: true})
                    );
                container.querySelectorAll('.input_counter > .line_logic')
                    .forEach(line => jsPlumb
                        .addEndpoint(line, {
                                endpoint: ["Dot", {radius: 4}],
                                cssClass: "aRedEndpoint",
                                anchor: "Left",
                                connector: "Flowchart"
                            },
                            {isSource: true, isTarget: true})
                    );
                container.querySelectorAll('.output_counter > .line_logic')
                    .forEach(line => jsPlumb
                        .addEndpoint(line, {
                                endpoint: ["Dot", {radius: 4}],
                                cssClass: "aRedEndpoint",
                                anchor: "Right",
                                connector: "Flowchart"
                            },
                            {isSource: true, isTarget: true})
                    );
                container.querySelectorAll('.input_counter > .line_logic_analyzer')
                    .forEach(line => jsPlumb
                        .addEndpoint(line, {
                                endpoint: ["Dot", {radius: 4}],
                                cssClass: "aRedEndpoint",
                                anchor: "Left",
                                connector: "Flowchart"
                            },
                            {isSource: true, isTarget: true})
                    );
                $("#log_"+i).draggable({
                    drag: function () {
                        jsPlumb.repaint($(this));
                    },
                });
                i = i + 1;
            }

        });

    });
};