$("#opener").click(function () {
    $("#panel").fadeIn();
    $("#opener").addClass("vision");
    $("#closer").removeClass("vision");
});
$("#closer").click(function () {
    $("#panel").fadeOut();
    $("#opener").removeClass("vision");
    $("#closer").addClass("vision");
});

$("#id1").click(function () {
    $("#elem1").fadeToggle();
    $("#elem1").toggleClass('elements_size');
    $("#id1").toggleClass('elements_color');
    $("#and").toggleClass('elements_color');
    $("#or").toggleClass('elements_color');
    $("#andnot").toggleClass('elements_color');
    $("#ornot").toggleClass('elements_color');
    $("#not").toggleClass('elements_color');
});

$("#id2").click(function () {
    $("#elem2").fadeToggle();
    $("#elem2").toggleClass('elements_size');
    $("#id2").toggleClass('elements_color');
    $("#counter").toggleClass('elements_color');
    $("#counter_").toggleClass('elements_color');
});

$("#id3").click(function () {
    $("#elem3").fadeToggle();
    $("#elem3").toggleClass('elements_size');
    $("#id3").toggleClass('elements_color');
    $("#analyzer1").toggleClass('elements_color');
    $("#analyzer2").toggleClass('elements_color');
});

$("#clk").click(function () {
    $("#analyz").fadeToggle();
    $("#containeranalyzer").fadeToggle();
    $("#clk_edit").fadeToggle();
});

$("#analyz").click(function () {
    $("#analyz").toggleClass('openanalyzer');
    $("#containeranalyzer").toggleClass('openselectmenu');
});

$("#graf").click(function () {
    $("#graf").addClass('selectanalyzerselected');
    $("#table").removeClass('selectanalyzerselected');
});

$("#table").click(function () {
    $("#graf").removeClass('selectanalyzerselected');
    $("#table").addClass('selectanalyzerselected');
});

