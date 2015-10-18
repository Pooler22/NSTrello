/**
 * BoardController
 *
 * @description :: Server-side logic for managing boards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //loads add-booard form -> new.ejs
  'new': function(req,res){
    res.view();

  },
  create: function(req, res, next){
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
    Board.findOne(req.params['id'], function foundBoard (err, board){
      if (err) return next(err);
      if (!board) return next();
      res.view({
        board: board
      });
    });
  }
};
