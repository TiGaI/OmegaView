var moment = require('moment');

export function pushFeedObjectAction(userID){
  var today = moment().startOf('day');



  return dispatch => {
    fetch('http://localhost:8080/getFeed', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        userID: userID
      })
    }).then((response) => response.json())
      .then((responseJson) => {
          var feedObject = Object.assign({}, responseJson);
          dispatch(pushFeedObject(feedObject));
    }).catch((err) => {
      console.log('Error in createGoal', err)
    });
  };
}

export function pushFeedObject(feedObject) {
    return {
        type: 'MAINPAGE_DATA',
        feedObject
    };
}
