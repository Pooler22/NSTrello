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
        var ret = true;
        List.create(req.params.all(), function listCreated (err, list){
            if (err) {
                ret = false;
                req.session.flash = {
                    err: err
                };
            }
						return res.redirect('/board/show/' + req.param('owner'))
            //return res.json({ result: ret })
        });
    },

		index: function(req,res, next) {
	    List.find(function foundLists(err, lists) {
	      if (err) return next(err);
	      res.view({
	        lists: lists
	      });
	    });
	  },

	  edit: function(req,res,next){
	    List.findOne(req.params['id'], function foundBoard(err, list){
	      if (err) return next(err);
	      if (!list) return next('Brak takiej listy.');
	      res.view({
	        list: list
	      });
	    });
	  },

		update: function(req, res, next){
	    List.update(req.params['id'], req.params.all(), function updateBoard(err){
	      if(err){
	        return res.redirect('/board/show/' + req.param('owner'));
	      }
	      res.redirect('/board/show/' + req.param('owner'));
	    });
	  },

    destroy: function(req, res, next){
        var ret = false;

        try {
            List.findOne(req.param('id'), function foundList(err, list){
                if (err) return next(err);
                if (!list) return res.json({ result: ret });
                console.log(list);
                List.destroy(req.param('id'), function listDestroyed(err){
                    ret = true;
                });
                return res.json({ result: true })
            });

        } catch(e) {
            console.log(e);
            return res.json({ result: ret })
        }
    }
};
