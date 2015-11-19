$(document).ready(function() {

    $('.new-card').click(function(){
       $('.new-card').addClass('form-hidden');
       $(this).removeClass('form-hidden');
        console.log($(this).children('textarea').length);

    });

    $(document).mouseup(function (e)
    {
        var container = $(".list ");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $('.new-card').addClass('form-hidden');
        }
    });

  $(".form-create-card").submit(function(e) {
    var textarea = $(this).children('.card-composer').children('.list-card').children('.list-card-details').children('.list-card-composer-textarea');
    var url = $(this).attr('action');
    var header = $(this).children('.card-composer').children('.list-card').children('.list-card-details').children('.card-title').val();
    var owner = $(this).children('.card-composer').children('.cu-clearfix').children('.list-id').attr('value');
    $.ajax({
      type: "POST",
      url: url,
      data: {
        header: textarea.val(),
        owner: owner
      },
      success: function(data) {
        if (data.result === true) {
          console.log(data);
            $('[data-list-id="'+owner+'"] .card-list').append('<div class="card">'+
            '<input type="hidden" name="owner" value="">'+
            '<div class="card-title">'+header+'</div>'+
            '</div>');

            textarea.val("").focus();

        } else {
          console.log(data);
        }
      },
      error: function(result) {
        console.log(data);
        // $('#modal').modal('show');
      }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form.
  });

});
