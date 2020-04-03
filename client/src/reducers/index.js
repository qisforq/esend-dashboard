import { combineReducers } from 'redux';
import authReducer from './authReducer';
import rippleReducer from './rippleReducer';
import sendMoneyReducer from './sendMoneyReducer';

export default combineReducers({
  auth: authReducer,
  ripple: rippleReducer,
  sendMoney: sendMoneyReducer,
});