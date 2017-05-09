export function pushFeedObjectAction(userID){
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
          var feedObject = [...responseJson];
          dispatch(pushFeedObject(feedObject));
    }).catch((err) => {
      console.log('Error in createGoal', err)
    });
  };
}

export function pushReportObjectAction(userID){
  return dispatch => {
    fetch('http://localhost:8080/getReport', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        userID: userID
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log('reportObject: ', responseJson)
          var reportObject = [...responseJson];
          dispatch(pushReportObject(reportObject));
    }).catch((err) => {
      console.log('Error in createGoal', err)
    });
  };
}

export function updateFeedObjectAction(feedObject){
  return dispatch => {
      dispatch(pushFeedObject(feedObject));
  };
}

export function updateDeletedFeedObjectAction(feedObject){
  return dispatch => {
      dispatch(pushFeedObject(feedObject));
  };
}

export function pushFeedObject(feedObject) {
    return {
        type: 'MAINPAGE_DATA',
        feedObject
    };
}

export function pushReportObject(reportObject) {
    return {
        type: 'REPORT_DATA',
        reportObject
    };
}

export function updateFeedObject(feedObject) {
    return {
        type: 'UPDATE_MAINPAGE_DATA',
        feedObject
    };
}
