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

$(document).ready(function(){
  $('.form-create-list').validate({
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
