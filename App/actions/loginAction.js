import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import {
  AsyncStorage
} from 'react-native'

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import * as getDataActions from './getDataAction';
var moment = require('moment');

const facebookParams = 'id,name,email,picture.width(100).height(100), gender, age_range, about';

export function createGoalBackEnd(userID, myDailyGoalObject){
  var today = moment().startOf('day');

  return dispatch => {

    dispatch(updateUserGoal(myDailyGoalObject))

    fetch('http://localhost:8080/createGoal', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        today: today,
        userID: userID,
        myDailyGoal: myDailyGoalObject
      })
    }).catch((err) => {
      console.log('Error in createGoal', err)
    });
  };
}

export function updateGoalFrontEnd(myDailyGoalObject){
  return dispatch => {
      dispatch(updateUserGoal(myDailyGoalObject))
  };
}

export function getGraphDataForAsyn(userID) {
    return dispatch => {
        dispatch(loggedin());
          fetch('http://localhost:8080/getSortandGroupActivityForAsyn', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                userID: userID
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log('this is responseJson at getGraphDataForAsyn: ', responseJson)
                var userObject = Object.assign({}, responseJson);
                getDataActions.pushFeedObjectAction(userObject._id)(dispatch);
                dispatch(addUser(userObject));
            })
            .catch((err) => {
              console.log('error: ', err)
            });
        }
};

export function getGraphData(userID, myActivity) {
    return dispatch => {
        dispatch(attempt());

          fetch('http://localhost:8080/getSortandGroupActivity', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                userID: userID,
                myActivity: myActivity
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log('this is responseJson at getGraphData: ', responseJson)
                var userObject = Object.assign({}, responseJson);
                dispatch(addUser(userObject));
            })
            .catch((err) => {
              console.log('error: ', err)
            });
        }
};


function getInfo() {
    return new Promise((resolve, reject) => {

      const profileInfoCallback = (error, profileInfo) => {
        if (error) reject(error);
        resolve(profileInfo);
      };

      const profileInfoRequest =
        new GraphRequest(
          '/me',
          {
            parameters: {
              fields: {
                string: facebookParams,
              },
            },
          },
          profileInfoCallback
        );

      new GraphRequestManager().addRequest(profileInfoRequest).start();

    });
}

export function googleLogin(){

  return dispatch => {
      dispatch(attempt());

      GoogleSignin.signIn().then((user) => {
            var mongooseId = '';
            fetch('http://localhost:8080/googleAuth', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  result: user
                })
              })
              .then((response) => response.json())
              .then((responseJson) => {

                  var userObject = Object.assign({}, responseJson);
                  getDataActions.pushFeedObjectAction(userObject._id)(dispatch);
                  getGraphData(userObject._id, userObject.myActivity)(dispatch);
                  dispatch(loggedin());
                  AsyncStorage.setItem("USER_ID", userObject._id);
              })
              .catch((err) => {
                console.log('error: ', err)
              });
        })
        .catch((err) => {
          console.log('WRONG SIGNIN', err);
        })
        .done();
      };

}


function facebookLogin() {
  return new Promise((resolve, reject) => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends', 'user_about_me'])
    .then(function(result) {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
              getInfo().then((userDetails) => {
                resolve(userDetails);
              }).catch((requestError) => {
                reject(requestError);
              });
        }
      },
      function(error) {

        alert('Login fail with error: ' + error);
        reject(error);
      }
    );
  });
}

export function login() {
    return dispatch => {
        dispatch(attempt());

        facebookLogin().then((result) => {
          fetch('http://localhost:8080/facebookAuth', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                result: result
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {

              var userObject = Object.assign({}, responseJson);
              getDataActions.pushFeedObjectAction(userObject._id)(dispatch);
              getGraphData(userObject._id, userObject.myActivity)(dispatch);
              dispatch(loggedin());
              AsyncStorage.setItem("USER_ID", userObject._id);
            })
            .catch((err) => {
              console.log('error: ', err)
            });

        }).catch((err) => {
            dispatch(errors(err));
      });
    };
}

export function editProfile(userID, userObject) {
    return dispatch => {
        dispatch(attempt());

          fetch('http://localhost:8080/editUser', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                userID: userID,
                userObject: userObject
              })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                var userObject = Object.assign({}, responseJson);
                dispatch(addUser(userObject));
            })
            .catch((err) => {
              console.log('error: ', err)
            });

    };
}

export function skip() {
    return dispatch => {
        dispatch(attempt());
        dispatch(skipLogin());
    };
}

function facebookLogout() {
    return new Promise((resolve) => {
        LoginManager.logOut();
        return resolve();
    });
}

export function logout() {
    return dispatch => {
        dispatch(attempt());
        facebookLogout().then(() => {
           dispatch(loggedout());
        });
    };
}

export function googlelogout() {
    return dispatch => {
        dispatch(attempt());
        GoogleSignin.signOut()
        .then(() => {
           dispatch(loggedout());
        });
    };
}

export function attempt() {
    return {
        type: 'LOADING'
    };
}

export function errors(err) {
    return {
        type: 'ERROR',
        err
    };
}

export function loggedin() {
    return {
        type: 'LOGIN',
    };
}

export function skipLogin() {
    return {
        type: 'SKIP',
    };
}

export function loggedout() {
    return {
        type: 'LOGOUT'
    };
}

export function updateUserProfile(userObject) {
    return dispatch => {
        dispatch(addUser(userObject));
    };
}

export function addUser(userObject) {
    return {
        type: 'ADD_USER',
        userObject
    };
}

export function updateUserGoal(myDailyGoalObject) {
    return {
        type: 'UPDATE_GOAL',
        myDailyGoalObject
    };
}
