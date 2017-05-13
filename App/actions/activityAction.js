import { RNS3 } from 'react-native-aws3';
var Environment = require('../Environment.js')
var moment = require('moment');
var _ = require('underscore');
import * as getDataActions from './getDataAction';
import * as loginActions from './loginAction';


export function changeProductivityAction(productivity, myLastActivity, feedObject, userObject){
  return dispatch => {
  //frontend
  feedObject[0].activityProductivity = productivity
  getDataActions.updateFeedObjectAction(feedObject)(dispatch);
  var today = moment().startOf('day').format("DD/MM/YYYY");

  var newuserObject = Object.assign({}, userObject);
  var newmyLastActivity = Object.assign({}, myLastActivity);
  newmyLastActivity.activityProductivity = productivity;
  newuserObject.myLastActivity = newmyLastActivity;

  newuserObject.sortedPing[today][myLastActivity.activityCategory]['activities'][0].activityProductivity = productivity;
  loginActions.updateUserProfile(newuserObject)(dispatch);

  //backend
    dispatch(loginActions.addUser(newuserObject));
    fetch('http://localhost:8080/addProductivity', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        myLastActivity: myLastActivity,
        productivity: productivity,
        sortedPing: newuserObject.sortedPing
      })
    }).then((response) => response.json())
      .then((responseJson) => {
  

    }).catch((err) => {
      console.log('Error in createGoal', err)
    });

  };
}

export function putFormObjectIntoProp(formObject){
  return dispatch => {
      dispatch(pushFromObject(formObject));
  };
}

export function pushFromObject(formObject) {
    return {
        type: 'PASS_FORM',
        formObject
    };
}

export function createActivity(feedObject, activityObject, photo) {
  var copy = Object.assign({}, activityObject)
  if(photo){
      var file = {
          // `uri` can also be a file system path (i.e. file://)
          uri: photo.uri,
          name: activityObject.activityCreator + Date.now() +'.img',
          type: photo.mime
      }
      copy['activityImage'] = "https://your-bucket.s3.amazonaws.com/uploads%2F"+file.name
  }else{
      copy['activityImage'] = null
  }

  copy['createdAt'] = new Date();

    return dispatch => {
        fetch('http://localhost:8080/createActivity', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                activity: copy
              })
            }).then((response) => response.json())
            .then(responseJson => {
              copy['_id'] = responseJson.activity;
              copy['activityCreator'] = [responseJson.user._id]
                if(responseJson.user.activityImage){
                  var options = {
                    keyPrefix: "uploads/",
                    bucket: "newvuew",
                    region: Environment.AWS_DEFAULT_REGION,
                    accessKey: Environment.AWS_ACCESS_KEY_ID,
                    secretKey: Environment.AWS_SECRET_ACCESS_KEY,
                    successActionStatus: 201
                  }

                  RNS3.put(file, options).then(response => {
                    if (response.status !== 201)
                      throw new Error("Failed to upload image to S3");
                    console.log(response.body);
                  });
                }

                feedObject = [...[copy],...feedObject];

                var userObject = Object.assign({}, responseJson.user);

                getDataActions.updateFeedObjectAction(feedObject)(dispatch);
                loginActions.updateUserProfile(userObject)(dispatch);
                loginActions.getGraphData(userObject._id, userObject.myActivity)(dispatch);
            })
            .catch((err) => {
              console.log('error in createActivity -> ', err)
            });
    };
}

// later to do
// export function editActivity(activityID, activityCreatorId, activityObject){
//   console.log("INSIDE EDIT ACTIVITY", activityID, activityCreatorId, activityObject)
//   return dispatch => {
//     fetch('http://localhost:8080/editActivity', {
//       method: 'POST',
//       headers: {
//         'Content-Type' : 'application/json'
//       },
//       body: JSON.stringify({
//         activityID: activityID,
//         activityCreatorId: activityCreatorId,
//         activity: activityObject
//       })
//     })
//     .then((response) => response.json())
//     .then((responseJson) => {
//
//     })
//     .catch((err) => {
//       console.log('Error in editActivity', err)
//     });
//   };
// }

export function deleteActivity(feedObject, activityID, activityCreatorId){

  feedObject = feedObject.filter(function(x){
      return x._id !== activityID
  })
  getDataActions.updateDeletedFeedObjectAction(feedObject)(dispatch);

  return dispatch => {
    fetch('http://localhost:8080/deleteActivity', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        activityID: activityID,
        activityCreatorId: activityCreatorId
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
          var userObject = Object.assign({}, responseJson);
          loginActions.updateUserProfile(userObject)(dispatch);
    })
    .catch((err) => {
      console.log('Error in editActivity', err)
    });
  };
}
