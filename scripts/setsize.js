var panel = document.getElementById("panel");
var closer = document.getElementById("closer");

var id1 = document.getElementById('id1');
var elem1 = document.getElementById("elem1");
var and = document.getElementById("and");
var or = document.getElementById("or");
var andnot = document.getElementById("andnot");
var ornot = document.getElementById("ornot");
var not = document.getElementById("not");
var canvas = document.getElementById("canvas");
var id2 = document.getElementById('id2');
var elem2 = document.getElementById("elem2");
var counter = document.getElementById("counter");
var counter_ = document.getElementById("counter_");

var id3 = document.getElementById('id3');
var elem3 = document.getElementById("elem3");
var analyzer1 = document.getElementById("analyzer1");
var analyzer2 = document.getElementById("analyzer2");

var clk = document.getElementById("clk");
var clk_edit = document.getElementById("clk_edit");
var text_clk = document.getElementById("text_clk");
var input_clk = document.getElementById("input_clk");

var analyz = document.getElementById("analyz");
var containeranalyzer = document.getElementById("containeranalyzer");
var graf = document.getElementById('graf');
var table = document.getElementById('table');
var overlay = document.getElementById('overlay');

panel.onclick = function () {
    panel.classList.add("openpanel");
    closer.classList.add("vision");
    closer.classList.add("close2_show");
};

closer.onclick = function () {
    panel.classList.remove("openpanel");
    closer.classList.remove("close2_show");
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
and.onclick = function () {

};

id2.onclick = function () {
    elem2.classList.toggle("elements_size");
    id2.classList.toggle("elements_color");
    counter.classList.toggle("elements_color");
    counter_.classList.toggle("elements_color");
};

id3.onclick = function () {
    elem3.classList.toggle("elements_size");
    id3.classList.toggle("elements_color");
    analyzer1.classList.toggle("elements_color");
    analyzer2.classList.toggle("elements_color");
};

clk.onclick = function () {
    clk_edit.classList.toggle("clkactive");
    input_clk.classList.toggle("clk_hidden_input");
    text_clk.classList.toggle("clk_hidden");
};

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
    });
    $(function () {
        $("#svgs").draggable({containment: 'parent', grid: [15, 15]});
    });
};  