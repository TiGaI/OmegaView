import {loginReducer, profileReducer} from './loginReducer';
import { combineReducers } from 'redux-immutable';
import { mainPageData } from './getDataReducer';

const applicationReducers = {
	login: loginReducer,
	profile: profileReducer,
	data: mainPageData
};

export default function createReducer() {
	return combineReducers(applicationReducers);
}
