export function mainPageDataReducer(state = {
  feedObject: [],
  reportObject: [],
  notifications: [],
}, action) {
    switch (action.type) {
    case 'MAINPAGE_DATA':
        return Object.assign({}, state, {
            feedObject: action.feedObject
        });
    case 'REPORT_DATA':
        return Object.assign({}, state, {
            reportObject: action.reportObject
        });
    case 'UPDATE_MAINPAGE_DATA':
        return Object.assign(feedObject, state, {
            feedObject: action.newFeed
        });
    case "FETCHING_DATA":
        return Object.assign({}, state, {
          fetchingData: true
        })
    case "DONE_FETCHING":
          return Object.assign({}, state, {
            fetchingData: false
          })
    case 'GET_USER_ACTIVITIES':
        return Object.assign([], state, {
          allUserActivities: action.activities
        })
    case 'MAP_ACTIVITIES':
        return Object.assign([], state, {
          populatedActivities: action.activities
        })
    default:
        return state;
    }
}
