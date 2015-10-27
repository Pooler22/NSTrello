$(document).ready(function(){

    if($('#board-view').length > 0) {
        $('#board-view').css('min-height',$(window).outerHeight()-40+'px');
    }

    $("#rename-board").submit(function(e) {

        var url = $(this).attr('action'); // the script where you handle the form input.

        $.ajax({
            type: "POST",
            url: url,
            data: $("#idForm").serialize(), // serializes the form's elements.
            success: function(data)
            {
                alert(data); // show response from the php script.
            }
        });

        e.preventDefault(); // avoid to execute the actual submit of the form.
    });
});