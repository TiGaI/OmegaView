export function mainPageData(state = {
  fetchingData: false,
  populatedActivities: [],
  notifications: [],
  allUserActivities: []
}, action) {
    switch (action.type) {
    case 'MAINPAGE_DATA':
        return Object.assign({}, state, {
            newFeed: action.newFeed
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


    default:
        return state;
    }
}
