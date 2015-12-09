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
    create: function (req, res, next) {
        Member.create(req.params.all(), function memberCreated(err, member) {
            if (err) {
                req.session.flash = {
                    err: err
                };
            }
        return res.redirect('/team/show/' + member.owner);
        });
    },
    show: function (req, res, next) {
        Member.findOne(req.params.id, function foundMember(err, member) {
            if (err) return next(err);
            if (!member) return next();
            res.view({
                member: member
            });
        });
    },

    index: function(req, res, next) {
        Member.find(function foundMembers(err, members) {
            if (err) return next(err);
            res.view({
                members: members
            });
        });
    },

    edit: function(req, res, next) {
        Member.findOne(req.params.id, function foundMember(err, member) {
            if (err) return next(err);
            if (!mamber) return next('Not found team.');
            res.view({
                member: member
            });
        });
    },

    update: function(req, res, next) {
        Member.findOne(req.param('id'), function foundTeam(err, member) {
            if (err) return next(err);
            if (!member) return res.notFound();
            console.log(member);
            Team.update(req.params.id, req.params.all(), function updateMember(err) {
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
        Member.findOne(req.param('id'), function foundMember(err, member) {
            if (err) return next(err);
            if (!member) return res.notFound();
            console.log(member);
            Member.destroy(req.param('id'), function memberDestroyed(err) {
                if (err) return next(err);
                if (!member) return res.notFound();
                return res.redirect('/team/show/' + member.owner);
            });
        });
    }
};

