import { UPDATE_SEND_AMOUNT, UPDATE_RECEIVE_AMOUNT } from '../actions/types';

export default function(state = {}, { type, payload }) {
  // switch (action.type) {
  //   case UPDATE_SEND_AMOUNT:
  //     return action.payload || 0;
  //   // case UPDATE_RECEIVE_AMOUNT:
  //   //   return action.payload;
  //   default:
  //     return state;
  // }
  
  if (type === UPDATE_SEND_AMOUNT) {
    state.sendAmount = payload || 0
  }
  else if (type === UPDATE_RECEIVE_AMOUNT) {
    state.receiveAmount = payload || 0
  }
  // console.log("state in amountsReducer",state);

  return state;
}