import { combineReducers } from 'redux';
import authReducer from './authReducer';
import fxRateReducer from './fxRateReducer';
import amountsReducer from './amountsReducer';
import lockQuoteReducer from './lockQuoteReducer';

export default combineReducers({
  auth: authReducer,
  fxRate: fxRateReducer,
  amounts: amountsReducer,
  rippleData: lockQuoteReducer
});