$(document)
  .ready(function() {
    var el = document.getElementById('card');

    //Edycja
    $('#card-details-title')
      .click(function() {
        $(this)
          .parent('.title-show')
          .removeClass('title-show');
      });

    $(document).on('click', '.open-card-details', function() {
      console.log($(this).data('title'));
      $('.form-edit-card-name').addClass('title-show');
      $('#card-details-title').html($(this).data('title'));
      $('#card-details-title-input').val($(this).data('title'));
      $('#card-details-id').val($(this).data('card-id'));
      console.log($(this).data('card-id'));
      $('#modal-owner').val($(this).data('owner'));
      $('#form-create-comment textarea').val('');
      $('#comments-list').html("");

      setTimeout(function() {
        $.ajax({
          type: "POST",
          url: '/comment/show/' + $('#card-details-id').val(),
          data: {

          },
          success: function(data) {
            $.each(data.result, function(i, row) {
              console.log(this);

              if (this.type && this.type == 'image') {
                console.log('mamy obrazek');
                $('#form-create-comment textarea').val('');
                $('#comments-list').append(
                  '<div class="comment">' +
                  '<a href="' + this.comment +
                  '" target="_blank"><img src="' + this.comment +
                  '" style="max-width: 400px; max-height: 600px;"></a>' +
                  '<p>' + this.author + '</p>' +
                  '<span>' + this.updatedAt + '</span>' +
                  '</div>');

                /*if(pdf.indexOf(ext) > -1){
                 $('#form-create-comment textarea').val('');
                 $('#comments-list').append('<div class="comment">' +
                 '<a href="' +e.target.result+'" style="display: block; text-align: center;" target="_blank">'+
                 '<img src="/images/pdf-icon.png" style="max-height: 64px;">' +
                 '</a>' +
                 '<p>'+$('#author-name').val()+'</p>' +
                 '<span>Przed chwilą</span>' +
                 '</div>');
                 }
                 if(word.indexOf(ext) > -1){
                 console.log('mamy worda');
                 $('#comments-list').append('<div class="comment">' +
                 '<a href="' +e.target.result+'" style="display: block; text-align: center;" target="_blank">'+
                 '<img src="/images/word.png" style="max-height: 64px;">' +
                 '</a>' +
                 '<p>'+$('#author-name').val()+'</p>' +
                 '<span>Przed chwilą</span>' +
                 '</div>');
                 }*/
              } else if (this.type && this.type == 'pdf') {
                $('#form-create-comment textarea').val('');
                $('#comments-list').append(
                  '<div class="comment">' +
                  '<a href="' + this.comment +
                  '" style="display: block; text-align: center;" target="_blank">' +
                  '<img src="/images/pdf-icon.png" style="max-height: 64px;">' +
                  '</a>' +
                  '<p>' + this.author + '</p>' +
                  '<span>' + this.updatedAt + '</span>' +
                  '</div>');
              } else if (this.type && this.type == 'doc') {
                $('#form-create-comment textarea').val('');
                $('#comments-list').append(
                  '<div class="comment">' +
                  '<a href="' + this.comment +
                  '" style="display: block; text-align: center;" target="_blank">' +
                  '<img src="/images/word.png" style="max-height: 64px;">' +
                  '</a>' +
                  '<p>' + this.author + '</p>' +
                  '<span>' + this.updatedAt + '</span>' +
                  '</div>');
              } else {
                $('#comments-list').append(
                  '<div class="comment">' + this.comment +
                  '' +
                  '<p>' + this.author + '</p>' +
                  '<span>' + this.updatedAt + '</span>' +
                  '</div>');
              }

            });
          },
          error: function(result) {
            console.log(data);
          }
        });
      }, 10);
    });

    $('#change-card-name-form').submit(function(e) {
      var text = $('#card-details-title-input').val();
      var id = $('#card-details-id').val();
      $('.form-edit-card-name').addClass('title-show');
      console.log(id + " " + text);

      //send
      $('#card-details-title').html(text);
      $('[data-name-by-card-id="' + id + '"]').html(text);

      e.preventDefault();
      var url = '/';
      $.ajax({
        type: "POST",
        url: '/card/update/' + id,
        data: {
          header: text
        },
        success: function(data) {
          if (data.result === true) {
            console.log(data);

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

    //remove
    $('[data-delate-card-by-id]')
      .click(function() {
        var id = $('#card-details-id').val();
        $('[data-card-id="' + id + '"]').remove();
        console.log('delete ' + id);
        $.ajax({
          type: "POST",
          url: '/card/destroy/' + id,
          data: {},
          success: function(data) {
            if (data.result === true) {
              console.log(data);

            } else {
              console.log(data);
            }
          },
          error: function(result) {
            console.log(data);
            // $('#modal').modal('show');
          }
        });
      });

    //new
    $('.new-card')
      .click(function() {
        $('.new-card')
          .addClass('form-hidden');
        $(this)
          .removeClass('form-hidden');
        console.log($(this)
          .children('textarea')
          .length);

      });

    $(document)
      .mouseup(function(e) {
        var container = $(".list ");

        if (!container.is(e.target) // if the target of the click isn't the container...
          && container.has(e.target)
          .length === 0) // ... nor a descendant of the container
        {
          $('.new-card')
            .addClass('form-hidden');
        }
      });

    $(".form-create-card")
      .submit(function(e) {
        var textarea = $(this)
          .children('.card-composer')
          .children('.list-card')
          .children('.list-card-details')
          .children('.list-card-composer-textarea');
        var url = $(this)
          .attr('action');
        var header = $(this)
          .children('.card-composer')
          .children('.list-card')
          .children('.list-card-details')
          .children('.card-title')
          .val();
        var owner = $(this)
          .children('.card-composer')
          .children('.cu-clearfix')
          .children('.list-id')
          .attr('value');
        var order = $('[data-list-id="' + owner + '"] .card').length;
        $.ajax({
          type: "POST",
          url: url,
          data: {
            header: textarea.val(),
            owner: owner,
            n: order
          },
          success: function(data) {
            if (data.result === true) {
              console.log(data);
              var tmpId = 0;
              $('[data-card-id]').each(function() {
                if (tmpId <= $(this).attr('data-card-id')) {
                  tmpId = $(this).attr('data-card-id');
                }
              });
              $('[data-list-id="' + owner + '"] .card-list ul')
                .append(
                  '<div class="card-added-dynamicly card open-card-details" data-toggle="modal" data-title="' +
                  header +
                  '" data-target="#card-details" data-order="' +
                  order + '" data-card-id="' + (parseInt(tmpId) + 1) +
                  '" data-owner="' + owner + '">' +
                  '<input type="hidden" name="owner" value="' + owner +
                  '">' +
                  '<div class="card-title" data-name-by-card-id="' +
                  (parseInt(tmpId) + 1) + '">' + header + '</div>' +
                  '</div>');

              textarea.val("")
                .focus();

              console.log($('[data-list-id="' + owner +
                '"] .card-list ul'));
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
