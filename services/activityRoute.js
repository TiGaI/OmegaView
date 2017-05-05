"use strict";
var express = require('express');
var router = express.Router();
var _ = require('underscore');
var moment = require('moment');

//model
const User  = require('../models/models').User;
const Activity= require('../models/models').Activity;
const userNotification= require('../models/models').userNotification;

function getRangeofLonLat(lon, lat, kilometer){
  console.log(kilometer/110.574)
  var constant = kilometer/110.574;

  if(lon > 0){
    var minLongitude = lon + kilometer/(111.320*Math.cos((lat + constant)* (Math.PI/180)))
    var maxLongitude = lon - kilometer/(111.320*Math.cos((lat - constant)* (Math.PI/180)))
  }else{
    var minLongitude = lon - kilometer/(111.320*Math.cos((lat - constant)* (Math.PI/180)))
    var maxLongitude = lon + kilometer/(111.320*Math.cos((lat + constant)* (Math.PI/180)))
  }

  if(lat < 0){
    var minLatitude = lat + constant
    var maxLatitude = lat - constant
  }else{
    var minLatitude = lat - constant
    var maxLatitude = lat + constant
  }

  return {minLatitude: minLatitude,
          maxLatitude: maxLatitude,
          minLongitude: minLongitude,
          maxLongitude: maxLongitude
}
}

router.post('/getSortandGroupActivity', function(req, res){
    Activity.find({$and: [
      {'createdAt': {'$gt': new Date(Date.now() - 6*24*60*60*1000)}},
          {'_id' : {'$in': req.body.myActivity}}
        ]}).sort('-createdAt').exec(function(err, activities){
          if(err){
            console.log(err);
            res.send(err);
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

          User.findById(req.body.userID).exec(function(err, user){

              user.sortedPing = Object.assign({}, newObject)

              user.save(function(err, user){
                res.send(user)
              })

          })
    });
});

router.post('/createActivity', function(req, res){
  var activity = req.body.activity;
  Activity.find({$and: [
          {'activityCreator': activity.activityCreator},
          {'activityCategory': activity.activityCategory},
          {'createdAt': {'$gt': new Date(Date.now() - 2*24*60*60*1000)}}]}).sort('-createdAt').exec(function(err, activities){

        if(err){
          console.log(err);
          res.send(err);
          return err
        }

        if(activities.length > 0){
            var streakCount = true;
        }else{
            var streakCount = false;
        }
        var newActivity = new Activity({
              activityCreator: activity.activityCreator,
              activityNote: activity.activityNote,
              activityCategory: activity.activityCategory,
              activityLatitude: activity.activityLatitude,
              activityLongitude: activity.activityLongitude,
              activityDuration: activity.activityDuration,
              activityGoalForThatDay: activity.activityGoal,
              activityImage: activity.image ? activity.image : ''
            })
            console.log('newActivity: ', newActivity);

            newActivity.save(function(err, activityNew){
              if (err) {
                console.log('error has occur: ',  err)
              } else {
                User.findById(activityNew.activityCreator).exec(function(err, user){

                  if(streakCount){
                    // console.log(moment(activities[0].createdAt).format("DD/MM/YYYY"));
                    // console.log(moment(activityNew.createdAt).format("DD/MM/YYYY"));
                    // console.log(moment(activities[0].createdAt).format("DD/MM/YYYY") == moment(activityNew.createdAt).format("DD/MM/YYYY"))
                      if(moment(activities[0].createdAt).format("DD/MM/YYYY") != moment(activityNew.createdAt).format("DD/MM/YYYY")){
                          user.activityStreak[newActivity.activityCategory] = user.activityStreak[newActivity.activityCategory] + 1;
                        }
                  }else{
                      user.activityStreak[newActivity.activityCategory] = 1
                  }

                  user.markModified('activityStreak');

                  console.log(user.activityStreak)
                  user.myActivity = [...[activityNew._id.toString()], ...user.myActivity]
                  user.totalHoursLogged = user.totalHoursLogged + activity.activityDuration
                  user.myLastActivity = activityNew
                  user.save(function(err){
                    if (err) {
                      console.log('error has occur: ',  err)
                      res.send(activityNew)
                    } else {
                      console.log('Nice, activity added in the user model')
                      res.send(activityNew)
                    }
                  })
                })
              }
            })
  });

});

router.post('/editActivity', function(req,res){
  var activity = req.body.activity;
  var activityCreatorId = req.body.activityCreatorId;
  var activityId = req.body.activityID;
  Activity.findByIdAndUpdate(activityId, activity, {new: true}, function(err, newActivity){
    if(err){
      console.log(err);
      res.send(err);
      return err
    } else {
      res.send(newActivity);
      console.log(newActivity);
      return newActivity;
    }
  })
});

router.post('/deleteActivity', function(req,res){
  var activityCreatorId = req.body.activityCreatorId;
  var activityId = req.body.activityID;
  Activity.findByIdAndRemove(activityId, function(err, newActivity){
    if(err){
      console.log(err);
      res.send(err);
      return err
    }

      User.findById(activityCreatorId).exec(function(err, user){

          if(err){
            console.log(err);
          }

          user.myActivity = user.myActivity.filter((x) => {
              return x._id !== activityId
          })

          if(user.myLastActivity._id === activityId){
            Activity.findById(user.myActivity[1]).exec(function(err, activity){
              user.myLastActivity = activity
            })
          }

          user.totalHoursLogged -= newActivity.activityDuration

          user.save(function(err){
            if(err){
              console.log(err);
            }
          })

      });

      res.send(newActivity);
      console.log('Actiity Deleted', newActivity);
      return newActivity;


  })
});

module.exports = router;
