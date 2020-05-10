$(document).ready(function()
{

$('.switch').click(function()
{
$(this).toggleClass("switchOn");
if ($(this).hasClass('switchOn')) {
                $('#canvas').css( "opacity", "1" );
            } else {
                $('#canvas').css( "opacity", "0" );
            }
});
});
