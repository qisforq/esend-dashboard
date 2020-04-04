import { FETCH_USDMXN_RATE, LOCK_RIPPLE_QUOTE } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USDMXN_RATE:
      return action.payload.usdMxnRate || false;
    default:
      return state;
  }
}