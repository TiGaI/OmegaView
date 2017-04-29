import {loginReducer, profileReducer} from './loginReducer';
import { combineReducers } from 'redux-immutable';

const applicationReducers = {
	login: loginReducer,
	profile: profileReducer
};

export default function createReducer() {
	return combineReducers(applicationReducers);
}
