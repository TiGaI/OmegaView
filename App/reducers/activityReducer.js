export function formReducer(state = {formObject: {
          activityCategory: "studying",
          activityCategoryIndex: 0,
          activityDuration: 0.5,
          activityNote: '',
          public: true,
          photoData: null}}, action) {
    switch (action.type) {

    case 'PASS_FORM':
            return Object.assign({}, state, {
                formObject: action.formObject
        });

    default:
        return state;
    }
}
