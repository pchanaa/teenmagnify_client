import axios from 'axios';
import { LOGIN_USER } from './type';

export function loginUser(dataTosubmit){

  const request = axios.post('/user/login',dataTosubmit)
  .then(res=>res.data);

  return {
    type: LOGIN_USER,
    payload: request

  }
}