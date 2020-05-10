/* global scale */
// оборачиваем плагин в анонимную функцию
(function ($) {
    //пишем функцию с именем нашего плагина
    $.fn.build_canvas = function () {
        $('<div id="canvas">').appendTo(this);
        var canvas = $('#canvas');
        // прячем полосу прокрутки
        this.css({});
        canvas.mousedown(function (e) {
            // позиция касания
            var click_pos_x = e.offsetX, click_pos_y = e.offsetY,
                    // позиция элемента canvas относительно элемента box
                    canvas_pos = canvas.position(),
                    //сдвиги
                    shift_x, shift_y,
                    // событие скольжения в пределах документа
                    mouseMove = function (e) {
                        // проверяем, нажата ли центральная кнопка мыши
                        if (e.which === 5) {
                            // меняем вид курсора на время зажатия
                            canvas.css({cursor: 'move'});
                            // расстояние, пройденное относительно первого касания
                            shift_x = e.offsetX - click_pos_x;
                            shift_y = e.offsetY - click_pos_y;
                            //новое положение
                            var new_x = canvas_pos.left + shift_x;
                            var new_y = canvas_pos.top + shift_y;
                            // добавляем разницу к предыдущим координатам
                            canvas.css({left: new_x, top: new_y});
                            check_bounds(false);
                        }
                    },
                    // событие отпускания
                    mouseUp = function () {
                        // отменяем мониторинг перетаскивания и блокировку выделения
                        $(document).off('mousemove', mouseMove).off('mouseup', mouseUp);
                        $(document).off('mousedown', selection);
                        // возвращаем вид курсора
                        canvas.css({cursor: 'default'});
                    },
                    // снятие выделения при перетаскивании контента
                    selection = function () {
                        if (window.getSelection) {
                            window.getSelection().removeAllRanges();
                        } else {
                            document.selection.empty();
                        }
                        return false;
                    };
            // инициализируем мониторинг перетаскивания и блокировку выделения
            $(document).on('mousedown', selection).on('mousemove', mouseMove);
            $(document).on('mouseup', mouseUp).on('contextmenu', mouseUp);
            $(window).on('blur', mouseUp);
        });
        
        return this;
		
    };
})(jQuery);