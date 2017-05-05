import {loginReducer, profileReducer} from './loginReducer';
import { combineReducers } from 'redux-immutable';
import { mainPageDataReducer } from './getDataReducer';
import { formReducer } from './activityReducer';

const applicationReducers = {
	login: loginReducer,
	profile: profileReducer,
	data: mainPageDataReducer,
	form: formReducer
};

export default function createReducer() {
	return combineReducers(applicationReducers);
}
