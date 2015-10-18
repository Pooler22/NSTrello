$(document).ready(function(){
  $('.form-create-board').validate({
    rules: {
      name: {
        required: true
      }
    },
    success: function(element) {
      element.text('OK').addClass('valid')
    }
  });
});
