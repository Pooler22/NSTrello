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
            return res.json({ result: ret })
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
