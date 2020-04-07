import { combineReducers } from 'redux';
import authReducer from './authReducer';
import fxRateReducer from './fxRateReducer';
import amountsReducer from './amountsReducer';
import rippleReducer from './rippleReducer';
import kycReducer from './kycReducer';

export default combineReducers({
  auth: authReducer,
  fxRate: fxRateReducer,
  amounts: amountsReducer,
  rippleData: rippleReducer,
  kyc: kycReducer,
});