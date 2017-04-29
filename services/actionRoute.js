"use strict";
var express = require('express');
var router = express.Router();

//model
const User  = require('../models/models').User;
const Activity= require('../models/models').Activity;
const Usernotification= require('../models/models').Usernotification;

router.post('/createGoal', function(req, res){
    User.findOne({$and: [
          {'user': req.body.user}
          ]})
     .exec( function(err, user) {
        if (err) {
            return {err, user}
        }

      if(user){

          user[goal]=req.body.goalObject

          user.save(function(err,user){
              if(err){
                console.log(err)
                return err
              }
              console.log('user goal created!');
              res.send(user)
          })

      }else{
        console.log('No user existed!')
        res.send(null)
      }
    })
});

module.exports = router;
