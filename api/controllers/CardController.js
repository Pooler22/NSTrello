/**
 * cardController
 *
 * @description :: Server-side logic for managing cards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
  new: function(req, res) {
    res.view();
  },

  create: function(req, res, next) {
    Card.create(req.params.all(), function cardCreated(err, card) {
      if (err) {
        req.session.flash = {
          err: err
        };
      }
      return res.json({
        result: true
      });
    });
  },

  index: function(req, res, next) {
    Card.find(function foundcards(err, cards) {
      if (err) return next(err);
      res.view({
        cards: cards
      });
    });
  },

  edit: function(req, res, next) {
    Card.findOne(req.params.id, function foundlist(err, card) {
      if (err) return next(err);
      if (!card) return next('Brak takiej cardy.');
      res.view({
        card: card
      });
    });
  },

  update: function(req, res, next) {
    Card.update(req.params.id, req.params.all(), function updatelist(err) {
      if (err) {
        return res.redirect('/list/show/' + req.param('owner'));
      }
      res.redirect('/list/show/' + req.param('owner'));
    });
  },

  destroy: function(req, res, next) {
    Card.findOne(req.param('id'), function foundcard(err, card) {
      if (err) return next(err);
      if (!card) return res.notFound();
      console.log(card);
      card.destroy(req.param('id'), function cardDestroyed(err) {
        if (err) return next(err);
        if (!card) return res.notFound();
        return res.json({
          result: true
        });
      });
    });
  }
};
