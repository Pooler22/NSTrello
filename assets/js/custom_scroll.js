$(document).ready(function() {

    var $customScrollBarElements = '.custom-scroll-bar';
    var $dragging = null;
    var $scrollBarClicked = false;
    var $scrollBar = null;
    var $scrollBarParent = null;
    var $scrollContentElementsArray = [];

    $('.custom-scroll').each(function(key){
        var $scrollContent = $(this).attr('data-scroll');
        var length = $($scrollContent+' '+'div[data-scroll-content] > .list').length;
        var widthContent = $($scrollContent+' '+'div[data-scroll-content]').outerWidth()
        var widthElement = $($scrollContent+' '+'div[data-scroll-content] *:first-child').outerWidth()+10;

        console.log(widthContent +" >= "+length+" * "+widthElement);

        if(widthContent >= length*widthElement) $(this).css('display', 'none');

        $scrollContentElementsArray[$scrollContent] = {
            length: length,
            widthContent: widthContent,
            widthElement: widthElement
        };

        $('.custom-scroll').children($customScrollBarElements).css('width', widthContent/(length*widthElement)*100+'%');
        console.log(length);
    });

    $($customScrollBarElements).on("mousedown", function (e) {
        $scrollBarClicked = true;
        $dragging = $(e.target);
        $scrollBar = $(this);
        $scrollBarParent = $scrollBar.parent();
        $('body').addClass('noselect');
    });

    $(document).on("mousemove", function(e) {

        if ($dragging && $scrollBarClicked) {
            var $scrollElement = $scrollBarParent.attr('data-scroll');

            $dragging.offset({
                left: e.pageX-$scrollBar.outerWidth()/2
            });


            if($scrollBar.position().left <= $scrollBarParent.position().left){
                $dragging.offset({
                    left: $scrollBarParent.position().left
                });
            }

            if($scrollBar.position().left+$scrollBar.outerWidth() >= $scrollBarParent.position().left+$scrollBarParent.outerWidth()){
                $dragging.offset({
                    left: $scrollBarParent.position().left*2+$scrollBarParent.outerWidth()-$scrollBar.outerWidth()
                });
            }

            var percent = Math.floor($scrollBar.position().left/($scrollBarParent.outerWidth()-$scrollBar.outerWidth())*100-1)/100;

            var el = $scrollContentElementsArray[$scrollElement];
            var move = percent*el.length*el.widthElement;
            console.log(percent+" * "+el.length+" * "+el.widthElement);

            $($scrollElement).children('[data-scroll-content]').css('margin-left',-(move)+'px');
        }
    });


    /*$(document.body).on("mousedown", "div", function (e) {
        $dragging = $(e.target);
    });*/

    $(document.body).on("mouseup", function (e) {
        $dragging = null;
        $scrollBarClicked = false;
        $scrollBar = null;
        $scrollBarParent = null;
        $('body').removeClass('noselect');
    });

    $(window).resize(function(){
        if($('.custom-scroll').length > 0)
            window.location.reload();
    })

});