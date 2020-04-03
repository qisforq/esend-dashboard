import { FETCH_USDMXN_RATE, LOCK_RIPPLE_QUOTE } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USDMXN_RATE:
      return action.payload || false;
    case LOCK_RIPPLE_QUOTE:
      return action.payload || 'ERROR';
    default:
      return state;
  }
}