$(document).ready(function(){
   $('#add-checklist').click(function(){
      $('#checklist').show();
   });
    var checklistItems = 0;

    $('.add-item-to-checklist').click(function(){
        $("#checklist-tiems").append('<div style="position:relative; padding: 5px 0 0;">' +
        '<span style="position:absolute; line-height: 34px;"># '+checklistItems+':</span>' +
        '<input type="text" class="form-control" data-checklist-item="'+checklistItems.length+'" style="max-width: 90%; display: inline-block; margin-left:10%;"></div>');
        checklistItems++;
    });
});