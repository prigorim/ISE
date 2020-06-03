$(document).ready(function () {
    $(document).mousedown(function (event) {
        $("body").on("contextmenu", false);
        $('.context-menu').remove();
        if (event.which === 3) {
            var target = $(event.target);

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
                        $('<ul/>').append('<li id="add_element"><p id="add_element">Добавить элемент</p>')
                            .append('<li><p id="return_move">Вернуть положение</p></li></div>')
                            .append('<li id="fix_scale"><p id="fix_scale">Восстановить масштаб</p></li>')
                    )
                    .show('fast');
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
            //alert(target.classList);
            if (target.is("<table/>")) {
                $('<div/>', {
                    class: 'context-menu'
                })
                    .css({
                        left: event.pageX + 'px',
                        top: event.pageY + 'px'
                    })
                    .appendTo('body')
                    .append(
                        $('<ul/>').append('<li  id="remove_element"><p id="remove_element">Удалить элемент</p></li>')
                            .append('<li id="change_element"><p id="change_element">Изменить элемент</p></li>')
                    )
                    .show('fast');
                $("#remove_element").click(function () {
                    alert(1);
                    target.remove();
                });
            }

        }

    });
});
