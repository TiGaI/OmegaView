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
  console.log('GET INSIDE SERVER GET GRAPH DATA')
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

          User.findById(req.body.userID, function(err, user){

              user.sortedPing = newObject

              user.save(function(err){

                res.send(user)
                return user
              })

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
    } else {
      res.send(newActivity);
      console.log('Actiity Deleted', newActivity);
      return newActivity;
    }

  })
});

router.post('/createActivity', function(req, res){
  var activity = req.body.activity;
  Activity.findOne({$and: [
          {'activityCreator': activity.activityCreator},
          {'activityLatitude': activity.activityLatitude},
          {'activityLongitude': activity.activityLongitude}]}).exec(function(err, activities){

        if(err){
          console.log(err);
          res.send(err);
          return err
        }

        if(!activities){

                var newActivity = new Activity({
                      activityCreator: activity.activityCreator,
                      activityNote: activity.activityNote,
                      activityCategory: activity.activityCategory,
                      activityLatitude: activity.activityLatitude,
                      activityLongitude: activity.activityLongitude,
                      activityDuration: activity.activityDuration,
                      activityImage: activity.image ? activity.image : ''
                      // activityVideo: req.files['video'] ? req.files['video'][0].location : ''
                    })

                    newActivity.save(function(err, activityNew){
                      if (err) {
                        console.log('error has occur: ',  err)
                      } else {
                        console.log('Nice, you created a file')

                        User.findById(activityNew.activityCreator, function(err, user){

                          user.myActivity = [...user.myActivity, ...[activityNew._id.toString()]]

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

        }else{
          console.log('activities already exist!');
          return null;
        }
  });

});

module.exports = router;
