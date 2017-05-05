"use strict";
var express = require('express');
var router = express.Router();
var moment = require('moment');
//model
const User  = require('../models/models').User;
const Activity= require('../models/models').Activity;
const Usernotification= require('../models/models').Usernotification;

router.post('/getFeed', function(req, res){
  console.log("req.body", req.body)
  Activity.find({$and: [
          {'activityCreator': req.body.userID},
          {'createdAt': {'$gt': new Date(Date.now() - 5*24*60*60*1000)}}]}).sort('-createdAt')
          .limit(10).exec(function(err, activities){

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

  var tomorrow = moment(req.body.today).add(1, 'days')
    User.findById(req.body.userID)
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
              var today = new Date(req.body.today)

              Activity.find({
                  createdAt: {
                    $gte: today.getDate(),
                    $lt: tomorrow
                  }
                }).sort('-createdAt').exec(function(err, activties){


                  activties.map((x, index) => {
                    if(x.activityCategory == 'studying'){
                      x.activityGoalForThatDay = req.body.myDailyGoal.studyingGoal
                    }else if(x.activityCategory == 'eating'){
                      x.activityGoalForThatDay == req.body.myDailyGoal.eatingGoal
                    }else if(x.activityCategory == 'training'){
                      x.activityGoalForThatDay == req.body.myDailyGoal.trainingGoal
                    }else if(x.activityCategory == 'hobby'){
                      x.activityGoalForThatDay == req.body.myDailyGoal.hobbyGoal
                    }else if(x.activityCategory == 'working'){
                      x.activityGoalForThatDay == req.body.myDailyGoal.workingGoal
                    }else{
                      x.activityGoalForThatDay == req.body.myDailyGoal.sleepingGoal
                    }

                    x.save(function(err, activity){
                      if (err) {
                          console.log(err);
                          res.send(err)
                      }
                    })
                  })
              });
              res.send(user)
          })
      }else{
        console.log('No user existed!')
        res.send(null)
      }
    })
});

module.exports = router;
