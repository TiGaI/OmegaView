import {loginReducer, profileReducer} from './loginReducer';
import { combineReducers } from 'redux-immutable';
import { mainPageData } from './getDataReducer';
import { formReducer } from './activityReducer';

const applicationReducers = {
	login: loginReducer,
	profile: profileReducer,
	data: mainPageData,
	form: formReducer
};

export default function createReducer() {
	return combineReducers(applicationReducers);
}
