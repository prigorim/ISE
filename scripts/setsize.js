const opener = document.getElementById("opener");
const closer = document.getElementById("closer");
const panel = document.getElementById("panel");

const id1 = document.getElementById('id1');
const elem1 = document.getElementById("elem1");
const and = document.getElementById("and");
const or = document.getElementById("or");
const andnot = document.getElementById("andnot");
const ornot = document.getElementById("ornot");
const not = document.getElementById("not");
const canvas = document.getElementById("canvas");
const id2 = document.getElementById('id2');
const elem2 = document.getElementById("elem2");
const counter = document.getElementById("counter");
const counter_ = document.getElementById("counter_");

const id3 = document.getElementById('id3');
const elem3 = document.getElementById("elem3");
const analyzer1 = document.getElementById("analyzer1");
const analyzer2 = document.getElementById("analyzer2");

const analyz = document.getElementById("analyz");
const containeranalyzer = document.getElementById("containeranalyzer");
const graf = document.getElementById('graf');
const table = document.getElementById('table');
const overlay = document.getElementById('overlay');

$("#opener").click(function () {
    $("#panel").fadeIn();
});
$("#closer").click(function () {
    $("#panel").fadeOut();
});
opener.onclick = function () {
    opener.classList.add("vision");
    closer.classList.remove("vision");
};
closer.onclick = function () {
    opener.classList.remove("vision")
    closer.classList.add("vision");
};

and.onclick = function () {
    //$("#and").plumb({ //???
    //target: 'andnot'
    //}); // КОРОЧЕ ВОТ ТУТ типо линия или нужно сначала задать какой-то вар?
    // jsPlumb.connect({
    // source: $("#svgs"),
    ///  target: $("#svgs2")
    //});
};


id1.onclick = function () {
    elem1.classList.toggle("elements_size");
    id1.classList.toggle("elements_color");
    and.classList.toggle("elements_color");
    or.classList.toggle("elements_color");
    andnot.classList.toggle("elements_color");
    ornot.classList.toggle("elements_color");
    not.classList.toggle("elements_color");
};
$("#id1").click(function () {
    $("#elem1").fadeToggle();
});
id2.onclick = function () {
    elem2.classList.toggle("elements_size");
    id2.classList.toggle("elements_color");
    counter.classList.toggle("elements_color");
    counter_.classList.toggle("elements_color");
};
$("#id2").click(function () {
    $("#elem2").fadeToggle();
});
id3.onclick = function () {
    elem3.classList.toggle("elements_size");
    id3.classList.toggle("elements_color");
    analyzer1.classList.toggle("elements_color");
    analyzer2.classList.toggle("elements_color");
};
$("#id3").click(function () {
    $("#elem3").fadeToggle();
});

$("#clk").click(function () {
    $("#analyz").fadeToggle();
    $("#containeranalyzer").fadeToggle();
    $("#clk_edit").fadeToggle();
});

analyz.onclick = function () {
    analyz.classList.toggle("openanalyzer");
    containeranalyzer.classList.toggle("openselectmenu");
};
graf.onclick = function () {
    graf.classList.add('selectanalyzerselected');
    table.classList.remove('selectanalyzerselected');
}
table.onclick = function () {
    graf.classList.remove('selectanalyzerselected');
    table.classList.add('selectanalyzerselected');
};

overlay.onclick = function () {
    $(function () {

        $("#canvas").draggable();
        $("#and").draggable({
            start: function( event, ui ) {
                $(this).removeClass('elements_color').css('z-index', '49');
            },
            appendTo: "#canvas",
            revert: 'invalid',
            helper: "clone",
        });
        $("#or").draggable({
            start: function( event, ui ) {
                $(this).removeClass('elements_color').css('z-index', '49');
            },
            appendTo: "#canvas",
            revert: 'invalid',
            helper: "clone",
            snap: "#canvas",
        });
        $("#ornot").draggable({
            start: function( event, ui ) {
                $(this).removeClass('elements_color').css('z-index', '49');
            },
            appendTo: "#canvas",
            revert: 'invalid',
            helper: "clone",
            snap: "#canvas",
        });
        $("#andnot").draggable({
            start: function( event, ui ) {
                $(this).removeClass('elements_color').css('z-index', '49');
            },
            appendTo: "#canvas",
            revert: 'invalid',
            helper: "clone",
            snap: "#canvas",
        });
        $("#not").draggable({
            start: function( event, ui ) {
                $(this).removeClass('elements_color').css('z-index', '49');
            },
            appendTo: "#canvas",
            revert: 'invalid',
            helper: "clone",
            snap: "#canvas",
        });
        $("#counter").draggable({
            start: function( event, ui ) {
                $(this).removeClass('elements_color');
            },
            appendTo: "#canvas",
            revert: 'invalid',
            helper: "clone",
            snap: "#canvas",
        });
        $("#counter_").draggable({
            start: function( event, ui ) {
                $(this).removeClass('elements_color');
            },
            appendTo: "#canvas",
            revert: 'invalid',
            helper: "clone",
            snap: "#canvas",
        });

        $("#trash").droppable({
            activeClass: "opacity_trash",
            //accept: "#and, #or, #andnot, #ornot, #not, #counter, #counter_";
            drop: function (ev, ui) {
                $(ui.draggable).remove()
            }
        });

        $("#canvas").droppable({
            accept: "#and, #or, #andnot, #ornot, #not, #counter, #counter_",
            drop: function (ev, ui) {
                x = ui.position.left / 15, y = ui.position.top / 15,
                    correctx = Math.ceil(x) * 15,
                    correcty = Math.ceil(y) * 15,
                    $(ui.draggable).clone()
                        .appendTo(this)
                        .removeClass()
                        .addClass('autowidth')
                        .removeAttr('id')
                        .draggable({
                            grid: [15, 15],
                            containment: 'parent',
                        })
                        .css({
                            left: correctx,
                            top: correcty
                        });
            }
        });

    });
};