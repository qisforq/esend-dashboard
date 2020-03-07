import axios from 'axios';
import { FETCH_USER } from './types';

const fetchUser = () => {
  // TODO!!!! React Udemy Course #82
  axios.get('/api/current_user')
};