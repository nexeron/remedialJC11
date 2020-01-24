import { combineReducers } from 'redux';
import { authReducer } from './AuthReducer';
import { API_URL } from '../API_URL'

export default combineReducers({
    auth: authReducer
})