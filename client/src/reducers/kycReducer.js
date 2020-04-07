import { UPDATE_RECIPIENT_KYC, UPDATE_SENDER_KYC } from '../actions/types';

const kycReducer = (state = {}, { type, payload }) => {
  
  if (type === UPDATE_RECIPIENT_KYC) 
    state.recipientInfo = payload

  else if (type === UPDATE_SENDER_KYC) 
    state.senderInfo = payload;
  return state;
  
}

export default kycReducer;