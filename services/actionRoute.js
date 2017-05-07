"use strict";
var express = require('express');
var router = express.Router();
var _ = require('underscore');
var moment = require('moment');
//model
const User  = require('../models/models').User;
const Activity= require('../models/models').Activity;
const Report= require('../models/models').Report;
const Usernotification= require('../models/models').Usernotification;

router.post('/getReport', function(req, res){
  Report.find({$and: [
          {'user': req.body.userID}]}).sort('-createdAt')
          .limit(6).exec(function(err, reports){
        if(err){
          console.log(err);
          res.send(err);
          return err
        }

        if(reports.length > 0){
          res.send(reports)
        }else{
          res.send(null)
        }
  });
});

function updateReport(userID){
  var today = moment().startOf('day');
  var tomorrow = moment(today).add(1, 'days');

  User.findById(userID).sort('-createdAt')
        .exec(function(err, user){
        if(err){
          console.log(err)
        }else{

      console.log('this is user', user)

      Report.findOne({$and: [{'user': userID},
                            {'createdAt' : {
                                  $gte: today.toDate(),
                                  $lt: tomorrow.toDate()
                                }}
                            ]
                          }).exec(function(err, report){

                          if(err){
                            console.log(err);
                          }

                          if(report){
                            report.activityGoalForThatDay = user.myActivity
                            report.dataObject = user.sortedPing

                            var average = 0;
                            var sumLength = 0;

                            _.map(user.sortedPing[todayDate], function(x, key){
                              if(key.length > 4 && key.length < 13){
                                if(x.activities[0].activityGoalForThatDay > 0){
                                  average = average + x.totalHoursForThisCategory / x.activities[0].activityGoalForThatDay
                                  sumLength += 1
                                }
                              }
                              return x;
                            })

                            report.GradeForTheDay = average/sumLength;
                            console.log(newReport.GradeForTheDay)
                            return null
                            // report.save(function(err){
                            //   if(err){
                            //     console.log(err)
                            //   }
                            // })
                          }else{
                            var newReport = new Report({
                              user: userID,
                              activitiesForTheDay: user.myActivity,
                              dataObject: user.sortedPing,
                              GradeForTheDay: 0
                            })
                            var todayDate= moment(today).format("DD/MM/YYYY")
                            // newReport.GradeForTheDay =
                            var average = 0;
                            var sumLength = 0;

                            _.map(user.sortedPing[todayDate], function(x, key){
                              if(key.length > 4 && key.length < 13){
                                if(x.activities[0].activityGoalForThatDay > 0){
                                  average = average + x.totalHoursForThisCategory / x.activities[0].activityGoalForThatDay
                                  sumLength += 1
                                }
                              }
                              return x;
                            })

                            newReport.GradeForTheDay = average/sumLength;
                            console.log(newReport.GradeForTheDay)
                            // newReport.save(function(err){
                            //   if(err){
                            //     console.log(err)
                            //   }
                            // })
                            return null
                        }
                    });
        }
  });
}

router.post('/checkStreak', function(req, res){
  var userID = req.body.userID;
    User.findById(activityNew.activityCreator).exec(function(err, user){

      Activity.find({$and: [
        {'createdAt': {'$gt': new Date(Date.now() - 1.75*24*60*60*1000)}},
            {'_id' : {'$in': user.myActivity}}
          ]}).sort('-createdAt').exec(function(err, activities){

            var checkStreak = {
              studying: 0,
              eating: 0,
              training: 0,
              hobby: 0,
              working: 0,
              sleeping: 0};

              activities.map(function(x){
                  checkStreak[x.activityCategory] = user.activityStreak[x.activityCategory]
                  return x
              })

              user.activityStreak = checkStreak;

              user.save(function(err, user){
                if(err){
                  res.send(err)
                }
                res.send(user)
              })
          });
    })
});

router.post('/getFeed', function(req, res){
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
  console.log('this is createGoal', req.body)
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
    updateReport(req.body.userID);
});

module.exports = router;
