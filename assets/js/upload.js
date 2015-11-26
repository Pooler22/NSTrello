$(document).ready(function(){

    $( '#my-form' ).submit( function( e ) {
            var formdate = new FormData( this );
            $.ajax( {
                url: '/file/upload',
                type: 'POST',
                data: formdate,
                processData: false,
                contentType: false,
                beforeSend: function(){
                },
                success: function(res){
                    console.log(res);
                    $('#loader-gif').hide();

                                        /*
                    if(res.files[0].type == 'image/jpeg') {

                    }*/


                }
            } );
            e.preventDefault();
        } );

    function readURL(input) {
        $('#loader-gif').show();

        var imageType = ['jpg', 'jpeg', 'png', 'gif'];
        var pdf = ['pdf'];
        var word = ['doc', 'docx'];
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#my-form').trigger('submit');

                var ext = input.files[0].name.split('.').pop().toLowerCase();
                if(imageType.indexOf(ext) > -1){
                    console.log('mamy obrazek');
                    $('#form-create-comment textarea').val('');
                    $('#comments-list').append('<div class="comment"><img src="'+e.target.result+'" style="width: 100px; max-height: 200px;">' +
                    '<p>'+$('#author-name').val()+'</p>' +
                    '<span>Przed chwilą</span>' +
                    '</div>');
                }
                if(pdf.indexOf(ext) > -1){
                    $('#form-create-comment textarea').val('');
                    $('#comments-list').append('<div class="comment">' +
                    '<a href="' +e.target.result+'" style="display: block; text-align: center;">'+
                        '<img src="/images/pdf-icon.png" style="max-height: 64px;">' +
                    '</a>' +
                    '<p>'+$('#author-name').val()+'</p>' +
                    '<span>Przed chwilą</span>' +
                    '</div>');
                }
                if(word.indexOf(ext) > -1){
                    console.log('mamy worda');
                    $('#comments-list').append('<div class="comment">' +
                    '<a href="' +e.target.result+'" style="display: block; text-align: center;">'+
                    '<img src="/images/word.png" style="max-height: 64px;">' +
                    '</a>' +
                    '<p>'+$('#author-name').val()+'</p>' +
                    '<span>Przed chwilą</span>' +
                    '</div>');
                }
                console.log();
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#input-with-file").change(function(){
        readURL(this);
    });

});