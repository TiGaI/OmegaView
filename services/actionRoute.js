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


router.post('/addProductivity', function(req, res){
  Activity.findById(req.body.myLastActivity._id).exec(function(err, activity){
    activity.activityProductivity = req.body.productivity
    activity.save(function(err){
      if(err){
        console.log(err)
      }
      // User.findById(req.body.myLastActivity.activityCreator).exec(function(err. user){
      //   user.myLastActivity = activity
      // })
    })
  })
});

router.post('/getReport', function(req, res){
  console.log('INSIDE GET REPORT SERVER')
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

router.post('/updateReportTest', function(req, res){
  updateReport(req.body.userID);
});

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

  var today =  moment(req.body.today).startOf('day')

  User.findById(req.body.userID)
     .exec(function(err, user) {
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

              Activity.find({$and: [
                      {'activityCreator': req.body.userID},
                      {'createdAt': {
                        $gte: today,
                        $lt: tomorrow
                      }}]})
                      .sort('-createdAt').exec(function(err, activties){

                  var promises = activties.map(function(x){
                    return new Promise(function(resolve, reject){

                      if(x.activityCategory == 'studying'){
                        x.activityGoalForThatDay = req.body.myDailyGoal.studying
                      }else if(x.activityCategory == 'eating'){
                        x.activityGoalForThatDay = req.body.myDailyGoal.eating
                      }else if(x.activityCategory == 'training'){
                        x.activityGoalForThatDay = req.body.myDailyGoal.training
                      }else if(x.activityCategory == 'hobby'){
                        x.activityGoalForThatDay = req.body.myDailyGoal.hobby
                      }else if(x.activityCategory == 'working'){
                        x.activityGoalForThatDay = req.body.myDailyGoal.working
                      }else if(x.activityCategory == 'sleeping'){
                        x.activityGoalForThatDay = req.body.myDailyGoal.sleeping
                      }

                      x.save(function(err){
                        if (err) {
                          console.log(err);
                          return reject(err)
                        }
                          resolve()
                      })

                    })
                  })

                  Promise.all(promises).then(() => {
                      updateReportGoal(user.myActivity, user._id);
                    })
                  })
              });
      }else{
        console.log('No user existed!')
        res.send(null)
      }
  });
});

function updateReportGoal(myActivity, userID, activityId){
  var today = moment().startOf('day');
  var tomorrow = moment(today).add(1, 'days');

    Activity.find({$and: [
      {'createdAt' : {
            $gte: today.toDate(),
            $lt: tomorrow.toDate()
          }},
          {'_id' : {'$in': myActivity}}
        ]}).sort('-createdAt').exec(function(err, activities){
          if(err){
            console.log(err);
            return err
          }

          var newObject = {};
          var copy, y;

          var x = _.groupBy(activities, function (date) {
            return moment(date.activityStartTime).format("DD/MM/YYYY");
          });

          for (var key in x) {
              y =  _.groupBy(x[key], 'activityCategory');
              newObject[key] = y;
          }

          var totalPinsPerDay = 0;
          var totalHoursPerDay = 0;
          _.map(newObject, function(num, key){
              _.map(newObject[key], function(num2, key2){
                totalPinsPerDay += newObject[key][key2].length
                var tempObject = newObject[key][key2].reduce(function(sum, next){
                    sum.activityDuration = sum.activityDuration + next.activityDuration;
                    return sum;
                })
                totalHoursPerDay += tempObject.activityDuration;

                newObject[key][key2] = {'activities': newObject[key][key2],
                                        'totalHoursForThisCategory': tempObject.activityDuration}
              });
                newObject[key] = Object.assign(newObject[key],
                  {'totalHoursPerDay': totalHoursPerDay},
                  {'totalPinsPerDay': totalPinsPerDay},
                  {'date': key})
                totalHoursPerDay = 0;
                totalPinsPerDay = 0;
          })

          User.findById(userID).exec(function(err, user){

              user.sortedPing = Object.assign({}, newObject)
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

                            user.activityStreak = Object.assign({}, checkStreak);

                            user.save(function(err, newUser){
                             if(err){
                               console.log(err);
                             }

                                 Report.findOne({$and: [{'user': newUser._id},
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
                                                       var todayDate= moment(today).format("DD/MM/YYYY");

                                                       report.dataObject = newUser.sortedPing
                                                       var average = 0;
                                                       var sumLength = 0;

                                                       _.map(newUser.sortedPing[todayDate], function(x, key){
                                                         if(key.length > 4 && key.length < 13){
                                                           if(x.activities[0].activityGoalForThatDay > 0){
                                                             if((x.totalHoursForThisCategory/x.activities[0].activityGoalForThatDay) >= 1){
                                                               average = average + 1
                                                               sumLength += 1
                                                             }else{
                                                               average = average + x.totalHoursForThisCategory / x.activities[0].activityGoalForThatDay
                                                               sumLength += 1
                                                             }

                                                           }
                                                         }
                                                         return x;
                                                       })
                                                       if(sumLength == 0){
                                                         sumLength = 1;
                                                       }

                                                       report.GradeForTheDay = average/sumLength;
                                                       report.save(function(err, newReport){
                                                         if(err){
                                                           console.log(err)
                                                         }
                                                       })
                                                       return null
                                                     }
                                               });

                            })
              });
          })
    });
}

module.exports = router;
