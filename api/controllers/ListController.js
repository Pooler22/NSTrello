/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  new: function (req, res) {
    res.view();
  },

  create: function (req, res, next) {
    List.create(req.params.all(), function listCreated(err, list) {
      if (err) {
        req.session.flash = {
          err: err
        };
      }
      return res.redirect('/board/show/' + req.param('owner'));
    });
  },

  index: function (req, res, next) {
    List.find(function foundLists(err, lists) {
      if (err) return next(err);
      res.view({
        lists: lists
      });
    });
  },

  edit: function (req, res, next) {
    List.findOne(req.params.id, function foundBoard(err, list) {
      if (err) return next(err);
      if (!list) return next('Brak takiej listy.');
      res.view({
        list: list
      });
    });
  },

  update: function (req, res, next) {
    List.findOne(req.param('id'), function foundList(err, list) {
        if (err) return next(err);
        if (!list) return res.notFound();
        console.log(list);
        List.update(req.params.id, req.params.all(), function updateList(err) {
            if (err) {
                return res.json({
                    result: false
                });
            }
            return res.json({
                result: true
            });
        });
    });
  },

  destroy: function (req, res, next) {
    List.findOne(req.param('id'), function foundList(err, list) {
      if (err) return next(err);
      if (!list) return res.notFound();
      console.log(list);
      List.destroy(req.param('id'), function listDestroyed(err) {
        if (err) return next(err);
        if (!list) return res.notFound();
        /*return res.json({
          result: true
        });*/
        return res.redirect('/board/show/' + list.owner);
      });
    });
  }
};
