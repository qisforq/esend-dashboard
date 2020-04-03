import axios from 'axios';
import * as type from './types';

export const fetchUser = () => async dispatch => {
  const { data } = await axios.get('/api/current_user')
  dispatch({ type: type.FETCH_USER, payload: data })
}

export const fetchUsdMxnRate = () => async (dispatch) => {
  const { data } = await axios.get('/fx_rate/usdmxn')
  dispatch({ type: type.FETCH_USDMXN_RATE, payload: data })
  // Dispatches to rippleReducer
}

export const updateSendAmount = (sendAmount = 0) => (
  {
    type: type.UPDATE_SEND_AMOUNT,
    payload: sendAmount
  }
  // Dispatches to sendMoneyReducer
);

// export const updateReceiveAmount = (receiveAmount = 0) => (
//   {
//     type: type.UPDATE_RECEIVE_AMOUNT,
//     payload: receiveAmount
//   }
// );

export const lockQuote = (receiveAmount) => async (dispatch) => {
  const { data } = await axios.post('/ripple/create-quote', {
    receiveAmount: receiveAmount
  })
  dispatch({type: type.LOCK_RIPPLE_QUOTE, payload: data})
  // Dispatches to rippleReducer
}