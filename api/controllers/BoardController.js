/**
 * BoardController
 *
 * @description :: Server-side logic for managing boards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //loads add-booard form -> new.ejs
  new: function(req,res){
    res.view();
  },

  create: function(req, res, next){
      global.myvar = 100;
    //create board with the params send from form -> new.ejs
    Board.create(req.params.all(), function boardCreated (err, board){
      if (err) {
        req.session.flash = {
          err: err
        };
        //if error then redirect to add-board form page
        return res.redirect('/board/new/');
      }
      //if successful then redirect to board page
      return res.redirect('/board/show/'+board.id);
    });
  },

  show: function(req, res, next){
      var lists = null;
      List.find().where({owner: req.params['id']}).exec(function listBoards(err, data) {
          if (err) return next(err);
          lists = data;
      });

      Board.findOne(req.params['id'], function foundBoard (err, board){
          if (err) return next(err);
          if (!board) return next();
          res.view({
              board: board,
              lists: lists
          });
      });
  },

  index: function(req,res, next) {
    Board.find(function foundBoards(err, boards) {
      if (err) return next(err);
      res.view({
        boards: boards
      });
    });
  },

  edit: function(req,res,next){
    Board.findOne(req.params['id'], function foundBoard(err, board){
      if (err) return next(err);
      if (!board) return next('Brak takiej tablicy.');
      res.view({
        board: board
      });
    });
  },

  editAjax: function(req,res,next){
      console.log('editAjax '+req.params['id']);
      console.log(req.params.all());
      Board.update(req.params['id'], req.params.all(), function updateBoard(err){
          if(err){
              res.json({ result: false })
          }
          res.json({ result: true })
      });
  },

  update: function(req, res, next){
    Board.update(req.params['id'], req.params.all(), function updateBoard(err){
      if(err){
        return res.redirect('/board/edit/' + req.param('id'));
      }
      res.redirect('/board/show/' + req.param('id'));
    });
  },

  destroy: function(req, res, next){
    Board.findOne(req.param('id'), function foundBoard(err, board){
      if (err) return next(err);
      if (!board) return next('Brak takiej tablicy.');
      Board.destroy(req.param('id'), function boardDestroyed(err){
        if (err) return next(err);
      });
      res.redirect('/board/')
    });
  }
};
