import {
  LOGIN_USER
} from "../actions/type";


export default function log(state={}, action){
  switch (action.type) {
    case LOGIN_USER:
      return {...state, loginSuccess:action.payload}
      break;
  
    default:
      return state;
  }

}
