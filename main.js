/* global jsPlumb */

var current_istance, scale = 1;
jsPlumb.ready(function () {
    current_istance = jsPlumb.getInstance();
    current_istance.importDefaults({
        Connector: ['StateMachine'], //Bezier, Flowchart, StateMachine, Straight
        Endpoint: ['Dot', {radius: 5}], //Blank, Dot, Image, Rectangle
        ConnectionOverlays: [['Arrow', {width: 15, length: 15, location: 1}]],
        EndpointStyle: {fill: '#273c75'},
        PaintStyle: {strokeWidth: 1, stroke: '#273c75'}
    });
    $('#wrap').build_canvas();
});
function add_node(id, left, top, text) {
    var sourceEndpoint = {
        isSource: true,
        maxConnections: 1,
        anchor: 'Top'
    };
    var targetEndpoint = {
        isTarget: true,
        maxConnections: 100,
        anchor: 'Bottom'
    };
    $('<textarea class="block" id="' + id + '">' + text + '</textarea>').appendTo($('#canvas'));
    autosize($('#' + id));
    $('#' + id).css({left: left - $('#' + id).width() / 2, top: top - $('#' + id).height() / 2}); // 
    current_istance.addEndpoint($('#' + id), sourceEndpoint);
    current_istance.addEndpoint($('#' + id), targetEndpoint);
    current_istance.draggable($('#' + id), {grid: [5, 5], containment: true});
    current_istance.revalidate($('#' + id));
    $('#' + id).click(function () {
        return false;
    });
    
   
    $('#' + id).blur(function () {
        $("#shape_panel").css("display", "none");
    });
    $('#' + id).focus(function () {
        $("#shape_panel").css("display", "block");
    });
}