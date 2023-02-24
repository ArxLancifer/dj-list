import React, { useRef, useState } from 'react';
import {Link} from 'react-router-dom';
import styles from './styles.module.css';
import axios from 'axios';
import { Alert } from 'react-bootstrap';


function UserLogin() {

    let localStorageTokens = localStorage.getItem("userToken");
    console.log(localStorageTokens);
    const [error, setError] = useState<String>("");
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null) 

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
        

        console.log(fetchUserData.data);
        if(!localStorageTokens){
            const userTokens = JSON.stringify(fetchUserData.data.userToken)
            localStorage.setItem("userToken", userTokens);
        }
        
    }
    // async function logIn(){
    //     const
    // }
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
