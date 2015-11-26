/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  new: function (req, res) {
    res.view();
  },

  create: function (req, res, next) {
    Comment.create(req.params.all(), function commentCreated(err, comment) {
      if (err) {
          return res.json({
              result: err
          });
      }
      return res.json({
        result: true
      });
    });
  },

    show: function (req, res, next) {
        Comment.find().where({ cardId: req.params.id }).exec(function(err, comments) {
            if (err) {
                return res.json({
                    result: err
                });
            }
            return res.json({
                result: comments
            });

        });
    },



  index: function (req, res, next) {
    Comment.find(function foundComments(err, comments) {
      if (err) return next(err);
      res.view({
        comments: comments
      });
    });
  },

  edit: function (req, res, next) {
    Comment.findOne(req.params.id, function foundComment(err, comment) {
      if (err) return next(err);
      if (!comment) return next('Brak takiego komentarza.');
			res.view({
        comment: comment
      });
    });
  },

  update: function (req, res, next) {
    Comment.update(req.params.id, req.params.all(), function updateComment(err) {
      if (err) return next(err);
      return res.json({
        result: true
      });
    });
  },

  destroy: function (req, res, next) {
    Comment.findOne(req.param('id'), function foundComment(err, comment) {
      if (err) return next(err);
      if (!comment) return res.notFound();
      Comment.destroy(req.param('id'), function commentDestroyed(err) {
        if (err) return next(err);
        if (!comment) return res.notFound();
        return res.json({
          result: true
        });
      });
    });
  }

};
