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