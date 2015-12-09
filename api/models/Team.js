/**
* Team.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    name:{
      type: 'string'
    },
    shortname:{
      type: 'string'
    },
    website:{
      type: 'string'
    },
    description:{
      type: 'string'
    },
    vsisibility:{
      type: 'string'
    },
    members:{
      collection: 'member'
    },
    owner: {
      model: 'user'
    }
  }
};
