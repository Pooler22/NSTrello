/**
 * ListController
 *
 * @description :: Server-side logic for managing lists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new: function(req,res){
    res.view();
  },
	create: function(req, res, next){
    List.create(req.params.all(), function listCreated (err, list){
      if (err) {
        req.session.flash = {
          err: err
        };
        return res.redirect('/list/new');
      }
      return res.redirect('/board/');
    });
  },
};
