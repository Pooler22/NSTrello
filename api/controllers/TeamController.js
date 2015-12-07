/**
 * TeamController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new: function(req, res) {
    res.view();
  },

  create: function(req, res, next) {
    Team.create(req.params.all(), function teamCreated(err, team) {
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
    Team.find(function foundTeams(err, teams) {
      if (err) return next(err);
      res.view({
        teams: teams
      });
    });
  },

  edit: function(req, res, next) {
    Team.findOne(req.params.id, function foundTeam(err, team) {
      if (err) return next(err);
      if (!team) return next('Not found team.');
      res.view({
        team: team
      });
    });
  },

  update: function(req, res, next) {
      Team.findOne(req.param('id'), function foundTeam(err, team) {
          if (err) return next(err);
          if (!team) return res.notFound();
          console.log(team);
          Team.update(req.params.id, req.params.all(), function updateTeam(err) {
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

  destroy: function(req, res, next) {
    Team.findOne(req.param('id'), function foundTeam(err, team) {
      if (err) return next(err);
      if (!team) return res.notFound();
      console.log(team);
      Team.destroy(req.param('id'), function teamDestroyed(err) {
        if (err) return next(err);
        if (!team) return res.notFound();
        return res.json({
          result: true
        });
      });
    });
  }
};
