import React, { useRef, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from './styles.module.css';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser, logOutUser } from './store/userState';
import { IUser } from '../interfaces/UserInterfaces';


function UserLogin() {

    let localStorageTokens = localStorage.getItem("userToken");
    const selector = useSelector<any>(state=>state.userData);
    const [error, setError] = useState<String>("");
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null) 
    const navigate = useNavigate();
    const dispatch = useDispatch();
   async function loginHandler(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        const emailInput = email.current?.value || "";
        const passwordInput = password.current?.value || "";
        const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
       
        if(!emailRegex.test(emailInput)){
            setError("Invalid email input");
            return null;
        }else if(passwordInput.length < 5) {
            setError("Invalid password")
            return null;
        }else {setError("")}
        const fetchUserData = await axios.post("http://localhost:5000/user/loginuser",
        {
            email:emailInput,
            password:passwordInput
        }
        )
        
        if(!localStorageTokens){
            const userTokens = JSON.stringify(fetchUserData.data.userToken)
            localStorage.setItem("userToken", userTokens);
        }
        console.log(fetchUserData.data)
        if(fetchUserData.status === 200){
            const userPayload: IUser = {
                name: fetchUserData.data.username,
                email: emailInput,
                id: fetchUserData.data.id,
                userTokens:{...fetchUserData.data.userToken},
                isAuth:true,
              };

            dispatch(logInUser(userPayload))
            navigate("/");

        }else {
            setError(fetchUserData.data)
        }
        
        
    }


    console.log(selector)


  return (
<div className='container'>
    <h1>Login Page</h1>
    <form className='w-50 mx-auto mt-5 border rounded p-5'>
        {error &&<Alert variant={'danger'}>{error}</Alert>}
    <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input ref={email} type="email" className="form-control" id="email" aria-describedby="email" />
    
    </div>
        <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input ref={password} type="password" className="form-control" id="password" />
        <div id="password" className="form-text">We'll never share your password with anyone else.</div>
    </div>
    <div className='d-flex justify-content-between align-items-center'>
        <button onClick={loginHandler} type="button" className="btn btn-primary">Login</button>
        <Link to={'/signup'}><h5 className={styles.links}>Create account</h5></Link>
    </div>
</form>
</div>
  )
}

export default UserLogin
