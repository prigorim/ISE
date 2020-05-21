$(document).ready(function () {
    $(document).mousedown(function (event) {
        $("body").on("contextmenu", false);
        $('.context-menu').remove();
        if (event.which === 3) {
            var target = $(event.target);
            target.addClass('selected-html-element');
            $('<div/>', {
                class: 'context-menu'
            })
                .css({
                    left: event.pageX + 'px',
                    top: event.pageY + 'px'
                })
                .appendTo('body')
                .append(
                    $('<ul/>').append('<li><a href="#">Remove element</a></li>')
                        .append('<li><a href="#">Add element</a></li>')
                )
                .show('fast');
        }
    });
});
