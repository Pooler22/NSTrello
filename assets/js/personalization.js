$(document).ready(function(){

    $('.personalization').click(function(){
       $(this).addClass('open');
    });

    $(document).mouseup(function (e)
    {
        var container = $(".personalization");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $('.personalization').removeClass('open');
        }
    });

    $('#background-color').change(function(){
        console.log('zmiana');
       $('.blue-bg, header .boards-link').css({
           'background-color': $(this).val()
       });
       $('header').css({
           background: convertHex($(this).val(),90)
       })
    });



    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.blue-bg').css({
                    'background-image': 'url('+e.target.result+')'
                });
                console.log();
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    $('#background-image').change(function(){
        readURL(this);
    });

});

function convertHex(hex,opacity){
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    return result;
}