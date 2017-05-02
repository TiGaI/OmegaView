"use strict";
var express = require('express');
var router = express.Router();

//model
const User  = require('../models/models').User;
const Activity= require('../models/models').Activity;
const Usernotification= require('../models/models').Usernotification;

router.post('/getFeed', function(req, res){
  Activity.find(
          {'createdAt': {'$gt': new Date(Date.now() - 5*24*60*60*1000)}}).limit(10).exec(function(err, activities){

        if(err){
          console.log(err);
          res.send(err);
          return err
        }

        if(activities.length > 0){
            res.send(activities)
        }else{
            res.send(null)
        }
  });
});

router.post('/createGoal', function(req, res){
    User.findOne({$and: [
          {'user': req.body.user}
          ]})
     .exec( function(err, user) {
        if (err) {
            return {err, user}
        }
      if(user){
          user.myDailyGoal = req.body.myDailyGoal

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
