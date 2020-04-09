import { ACCEPT_RIPPLE_QUOTE, LOCK_RIPPLE_QUOTE } from '../actions/types';

export default function(state = null, action) {
  
  switch (action.type) {
    case LOCK_RIPPLE_QUOTE:
      return action.payload || false;
    case ACCEPT_RIPPLE_QUOTE:
      return action.payload || false;
    default:
      return state;
  }
}