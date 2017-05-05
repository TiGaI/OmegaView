export function mainPageDataReducer(state = {
  feedObject: [],
  notifications: [],
}, action) {
    switch (action.type) {
    case 'MAINPAGE_DATA':
        return Object.assign({}, state, {
            feedObject: action.feedObject
        });
    case 'UPDATE_MAINPAGE_DATA':
        return Object.assign(feedObject, state, {
            feedObject: action.newFeed
        });

    default:
        return state;
    }
}
