$(document).ready(function(){

    $("#add-list").submit(function(e) {

        var url = $(this).attr('action'); // the script where you handle the form input.
        var newName = $(this).children('.name').val();
        var boardId = $(this).children('.board-id ').val();
        $.ajax({
            type: "POST",
            url: url,
            data: {
                name: newName,
                boardId: boardId
            },
            success: function(data)
            {
                console.log(data);
            },
            error: function(result) {
                console.log(data);
            }
        });

        e.preventDefault(); // avoid to execute the actual submit of the form.
    });

    $(".delete-list").submit(function(e) {

        var url = $(this).attr('action');
        var id = $(this).attr('data-list-id');
        $.ajax({
            type: "POST",
            url: url,
            data: {
                name: null
            },
            success: function(data)
            {
                if(data){
                    console.log(id);
                    $('.list[data-list-id="'+id+'"]').remove();
                }
                else{
                    $('#modal').modal('show');
                }
            },
            error: function(result) {
                console.log(data);
                $('#modal').modal('show');
            }
        });

        e.preventDefault(); // avoid to execute the actual submit of the form.
    });
});