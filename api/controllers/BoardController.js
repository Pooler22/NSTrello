/**
 * BoardController
 *
 * @description :: Server-side logic for managing boards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  'new': function(req,res){
    res.view();

  },

  create: function(req, res, next){
    Board.create(req.params.all(), function boardCreated (err, boards){
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };
        return res.redirect('/board/new');
      }
      res.json(boards);
      req.session.flash = {};

    });
  }
};
