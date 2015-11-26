$(document).ready(function(){

    $('#form-create-comment').submit(function (e) {
        e.preventDefault();
        var data = {
            type: 'comment',
            owner: $('#modal-owner').val(),
            cardId : $('#card-details-id').val(),
            author: $('#author-name').val(),
            comment : $(this).children('textarea').val()
        };
        $.ajax({
            type: "POST",
            url: '/comment/create/',
            data: data,
            success: function(msg) {
                $('#form-create-comment textarea').val('');
                $('#comments-list').append('<div class="comment">'+data.comment+'' +
                '<p>'+data.author+'</p>' +
                '<span>Przed chwilą</span>' +
                '</div>');
                console.log(msg);
            },
            error: function(result) {
                //console.log(data);
                // $('#modal').modal('show');
            }
        });
        e.preventDefault(); // avoid to execute the actual submit of the form.
    });
});