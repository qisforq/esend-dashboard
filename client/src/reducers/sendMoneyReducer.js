import { UPDATE_SEND_AMOUNT, UPDATE_RECEIVE_AMOUNT } from '../actions/types';

export default function(state = 0, action) {
  switch (action.type) {
    case UPDATE_SEND_AMOUNT:
      return action.payload || 0;
    // case UPDATE_RECEIVE_AMOUNT:
    //   return action.payload;
    default:
      return state;
  }
}