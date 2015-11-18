/**
 * BoardController
 *
 * @description :: Server-side logic for managing boards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //loads add-booard form -> new.ejs
  new: function(req, res) {
    res.view();
  },

  create: function(req, res, next) {
    Board.create(req.params.all(), function boardCreated(err, board) {
      sails.log.error(req.params.all());
      if (err) {
        req.session.flash = {
          err: err
        };
        return res.redirect('/board/new/');
      }
      return res.redirect('/board/show/' + board.id);
    });
  },

  show: function(req, res, next) {
    Board.findOne(req.params.id, function foundBoard(err, board) {
      if (err) return next(err);
      if (!board) return next();
      List.find().where({
        owner: req.params.id
      }).exec(function foundList(err, lists) {
        if (err) return next(err);
        var ids = [];
        for (var i = 0, len = lists.length; i < len; i++) {
          ids[i] = lists[i].id;
        }
        Card.find().where({
          owner: ids
        }).exec(function foundCards(err, cards) {
          if (err) return next(err);
          sails.log.error(cards);
          res.view({
            board: board,
            lists: lists,
            cards: cards
          });
        });
      });
    });
  },

  index: function(req, res, next) {
    Board.find(function foundBoards(err, boards) {
      if (err) return next(err);
      res.view({
        boards: boards
      });
    });
  },

  edit: function(req, res, next) {
    Board.findOne(req.params.id, function foundBoard(err, board) {
      if (err) return next(err);
      if (!board) return next('Brak takiej tablicy.');
      res.view({
        board: board
      });
    });
  },

  editAjax: function(req, res, next) {
    console.log('editAjax ' + req.params.id);
    console.log(req.params.all());
    Board.update(req.params.id, req.params.all(), function updateBoard(err) {
      if (err) {
        res.json({
          result: false
        });
      }
      res.json({
        result: true
      });
    });
  },

  update: function(req, res, next) {
    Board.update(req.params.id, req.params.all(), function updateBoard(err) {
      if (err) {
        return res.redirect('/board/edit/' + req.param('id'));
      }
      res.redirect('/board/show/' + req.param('id'));
    });
  },

  destroy: function(req, res, next) {
    Board.findOne(req.param('id'), function foundBoard(err, board) {
      if (err) return next(err);
      if (!board) return next('Brak takiej tablicy.');
      Board.destroy(req.param('id'), function boardDestroyed(err) {
        if (err) return next(err);
      });
      res.redirect('/board/');
    });
  }
};
