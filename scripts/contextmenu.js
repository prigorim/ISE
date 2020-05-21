$(document).ready(function () {
    $(document).mousedown(function (event) {
        $("body").on("contextmenu", false);
        $('.context-menu').remove();
        if (event.which === 3) {
            var target = $(event.target);
            target.addClass('selected-html-element');
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
                            .append('<div id="add_element"><li><p>Вернуть положение</p></li></div>')
                            .append('<div id="add_element"><li><p>Восстановить масштаб</p></li></div>')
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
                        $('<ul/>').append('<div id="remove_element"><li><p>Открыть корзину</p></li></div>')
                            .append('<div id="add_element"><li><p>Очистить корзину</p></li></div>')
                    )
                    .show('fast');
            }
            if (event.target.classList.contains('.autowidth')) {
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
                            .append('<div id="add_element"><li><p>Изменить элемент</p></li></div>')
                    )
                    .show('fast');
            }

        }

    });
});
