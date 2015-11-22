$(document).ready(function() {

  $('.dropdown-list').click(function() {
    $('.dropdown-list').removeClass('open');
    $(this).addClass('open');
  });

  $(document).mouseup(function(e) {
    var container = $('.dropdown-list');

    if (!container.is(e.target) && container.has(e.target).length === 0)
    // if the target of the click isn't the container...
    // ... nor a descendant of the container
    {
      $('.dropdown-list').removeClass('open');
    }
  });

  $('.rename-list').click(function() {
    $('#editListName').modal('show');
  });

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
      success: function(data) {
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
      success: function(data) {
        if (data) {
          console.log(id);
          $('.list[data-list-id="' + id + '"]').remove();
        } else {
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
