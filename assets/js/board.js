$(document).ready(function(){

    if($('#board-view').length > 0) {
        $('#board-view').css('min-height',$(window).outerHeight()-40+'px');
    }

    $("#rename-board").submit(function(e) {

        var url = $(this).attr('action'); // the script where you handle the form input.
        var newName = $('#new-name').val();
        $.ajax({
            type: "POST",
            url: url,
            data: {
                name: newName
            },
            success: function(data)
            {
                if(data.result === true){
                    $('.board-name').html(newName);
                }
            },
            error: function(result) {
                console.log(data);
            }
        });

        e.preventDefault(); // avoid to execute the actual submit of the form.
    });
});