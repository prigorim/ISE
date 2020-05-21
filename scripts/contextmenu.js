$(document).ready(function () {
    $(document).mousedown(function (event) {
        $("body").on("contextmenu", false);
        $('.context-menu').remove();
        if (event.which === 3) {
            var target = $(event.target);
            target.addClass('e');
            if (target.is('#canvas')) {
                $('<div/>', {
                    class: 'context-menu'
                })
                    .css({
                        left: event.pageX + 'px',
                        top: event.pageY + 'px'
                    })
                    .appendTo('body')
                    .append(
                        $('<ul/>').append('<div id="add_element"><li><p>Добавить элемент</p></li></div>')
                            .append('<div id="return_move"><li><p>Вернуть положение</p></li></div>')
                            .append('<div id="fix_scale"><li><p>Восстановить масштаб</p></li></div>')
                    )
                    .show('fast');
                $("#add_element").click(function () {
                    alert(1);
                });
            }
            if (target.is('#trash')) {
                $('<div/>', {
                    class: 'context-menu'
                })
                    .css({
                        left: event.pageX + 'px',
                        top: event.pageY + 'px'
                    })
                    .appendTo('body')
                    .append(
                        $('<ul/>').append('<div id="open_trash"><li><p>Открыть корзину</p></li></div>')
                            .append('<div id="clean_trash"><li><p>Очистить корзину</p></li></div>')
                    )
                    .show('fast');
            }
            if (target.is('#wrap')) {
                $('<div/>', {
                    class: 'context-menu'
                })
                    .css({
                        left: event.pageX + 'px',
                        top: event.pageY + 'px'
                    })
                    .appendTo('body')
                    .append(
                        $('<ul/>').append('<div id="center_canvas"><li><p>Центрировать</p></li></div>')
                    )
                    .show('fast');
            }
            //alert(target.classList); TODO EBAT
            if (target.hasClass("added_element")){
                $('<div/>', {
                    class: 'context-menu'
                })
                    .css({
                        left: event.pageX + 'px',
                        top: event.pageY + 'px'
                    })
                    .appendTo('body')
                    .append(
                        $('<ul/>').append('<div id="remove_element"><li><p>Удалить элемент</p></li></div>')
                            .append('<div id="change_element"><li><p>Изменить элемент</p></li></div>')
                    )
                    .show('fast');
            }

        }

    });
});
