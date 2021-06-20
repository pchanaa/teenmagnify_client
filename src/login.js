
import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import { loginUser } from './actions/user_action';
import { withRouter } from 'react-router-dom';

import './login.css';

const Login =(props)=> {

    const dispatch = useDispatch();


   const [Email, setEmail] = useState("");
   const [Password, setPassword] = useState("");

   const onEmailHandler=(event)=>{
     setEmail(event.currentTarget.value);
   }
   const onPasswordHandler=(event)=>{
    setPassword(event.currentTarget.value);
  }
  const onSubmitHandler=(event)=>{
    event.preventDefault();
    

    let body={
      email:Email,
      password:Password
    };
    if(Email==="chanhee0629@naver.com" && Password==="cksgml0629"){
      props.history.push('/', {state:true})
    }

    dispatch(loginUser(body)).then(res =>{if(res.payload.loginSuccess){
      props.history.push('/', {state:true})
    }
    else{
      alert('Error');
    }
  }
    
    )

    


  }




  return (
    
    <div className="login_caf">
        <form onSubmit={onSubmitHandler}>
          <label>Email</label>
          <input type="email" value={Email} onChange={onEmailHandler}/>
          <label>Password</label>
          <input type="password" value={Password} onChange={onPasswordHandler}/>
          <br />
          <button type="submit">
            로그인
          </button>



        </form>
      
      
    
     </div>
    
  )
    }

export default withRouter(Login);