$(document).ready(function() {

  $(".form-create-card").submit(function(e) {

    var url = $(this).attr('action');
    var header = $(this).children('.card-composer').children('.list-card').children('.list-card-details').children('.card-title').val();
    var owner = $(this).children('.card-composer').children('.cu-clearfix').children('.list-id').attr('value');
    $.ajax({
      type: "POST",
      url: url,
      data: {
        header: header,
        owner: owner
      },
      success: function(data) {
        if (data.result === true) {
          console.log(data);
          $(".new-card").append(".card-show");
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
