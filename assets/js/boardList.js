$(document).ready(function() {

   $('.add-board').click(function(){
       $('.add-new').addClass('open');
   });

    if($('#lists-main-view').length > 0) {
        $('#lists-main-view').css('min-height',$(window).outerHeight()-200+'px');
    }
});