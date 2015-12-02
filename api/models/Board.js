/**
 * Board.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: true,
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    lists: {
      collection: 'list',
      via: 'owner'
    },
    owner: {
      model: 'user'
    },
    activities: {
      collection: 'activity',
      via: 'owner'
    },
    acces: {
      type: 'string',
      required: true
    }
  }
};
