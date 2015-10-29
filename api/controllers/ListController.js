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
    console.log('createAjax '+req.params['owner']);
    console.log(req.params.all());
    var ret = true;
    List.create(req.params.all(), function listCreated (err, list){
        console.log('tworzy');
        if (err) {
            ret = false;
            req.session.flash = {
                err: err
            };
            return res.json({ result: ret })
        }
        return res.json({ result: ret })
    });


  }
};
