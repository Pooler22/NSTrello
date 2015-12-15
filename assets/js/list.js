$(document)
  .ready(function() {

    $(document).on('click', '.open-list-details', function() {
      console.log("dzialam");
      console.log($(this).data('list-id'));
      console.log($(this).data('owner'));

      $('#new-name').val($(this).data('list-name'));
      $('#list-id').val($(this).data('list-id'));
      $('#board-id').val($(this).data('owner'));
    });

    $('.dropdown-list')
      .click(function() {
        $('.dropdown-list')
          .removeClass('open');
        $(this)
          .addClass('open');
      });

    $(document)
      .mouseup(function(e) {
        var container = $('.dropdown-list');

        if (!container.is(e.target) && container.has(e.target)
          .length === 0)
        // if the target of the click isn't the container...
        // ... nor a descendant of the container
        {
          $('.dropdown-list')
            .removeClass('open');
        }
      });

    $('.rename-list')
      .click(function() {
        $('#editListName' + $(this)
            .val())
          .modal('show');
      });

    $("#rename-list")
      .submit(function(e) {
        console.log("0");
        var url = $(this)
          .attr('action'); // the script where you handle the form input.
        var newName = $('#new-name')
          .val();
        var listId = $('#list-id')
          .val();
        var ownerList = $('#board-id')
          .val();
        console.log(newName);
        console.log(listId);
        console.log(ownerList);
        $.ajax({
          type: "POST",
          url: url + listId,
          data: {

            name: newName
          },
          success: function(data) {
            if (data.result === true) {
              $('.list-name')
                .html(newName);
              $('.open-list-details').each(function() {

                if ($(this).attr("data-list-id") == listId) {
                  console.log("test");
                  $(this).html(newName);
                }
              });
              console.log("1");
              $('#editName')
                .modal('hide');
            }
          },
          error: function(result) {
            console.log(data);
            console.log("2");
          }
        });

        e.preventDefault(); // avoid to execute the actual submit of the form.
      });

    $("#add-list")
      .submit(function(e) {

        var url = $(this)
          .attr('action'); // the script where you handle the form input.
        var newName = $(this)
          .children('.name')
          .val();
        var boardId = $(this)
          .children('.board-id ')
          .val();
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

    $(".delete-list")
      .submit(function(e) {

        var url = $(this)
          .attr('action');
        var id = $(this)
          .attr('data-list-id');
        $.ajax({
          type: "POST",
          url: url,
          data: {
            name: null
          },
          success: function(data) {
            if (data) {
              console.log(id);
              $('.list[data-list-id="' + id + '"]')
                .remove();
            } else {
              $('#modal')
                .modal('show');
            }
          },
          error: function(result) {
            console.log(data);
            $('#modal')
              .modal('show');
          }
        });

        e.preventDefault(); // avoid to execute the actual submit of the form.
      });
  });
