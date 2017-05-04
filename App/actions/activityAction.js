import { RNS3 } from 'react-native-aws3';
var Environment = require('../Environment.js')
var _ = require('underscore');

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

export function createActivity(activityObject, photo) {
  var copy = Object.assign({}, activityObject)
  if(photo){
      var file = {
          // `uri` can also be a file system path (i.e. file://)
          uri: photo.uri,
          name: activityObject.activityCreator + Date.now() +'.img',
          type: photo.mime
      }
      copy['image'] = "https://your-bucket.s3.amazonaws.com/uploads%2F"+file.name
  }else{
      copy['image'] = null
  }
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
                if(responseJson.activityImage){
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


            })
            .catch((err) => {
              console.log('error in createActivity -> ', err)
            });
    };
}

export function editActivity(activityID, activityCreatorId, activityObject){
  console.log("INSIDE EDIT ACTIVITY", activityID, activityCreatorId, activityObject)
  return dispatch => {
    fetch('http://localhost:8080/editActivity', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        activityID: activityID,
        activityCreatorId: activityCreatorId,
        activity: activityObject
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {

    })
    .catch((err) => {
      console.log('Error in editActivity', err)
    });
  };
}

export function deleteActivity(activityID, activityCreatorId){
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

    })
    .catch((err) => {
      console.log('Error in editActivity', err)
    });
  };
}
