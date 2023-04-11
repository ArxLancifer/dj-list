import React, { useRef, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser, logOutUser } from './store/userState';
import { IUser } from '../interfaces/UserInterfaces';


function UserLogin() {

    let localStorageTokens = localStorage.getItem("userToken") || "";
    const [error, setError] = useState<string>("");
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
        const fetchUserData = await axios.post(`https://memotrack-api.onrender.com/user/loginuser`,
        {
            email:emailInput,
            password:passwordInput
        }
        ).catch((err: Error | AxiosError)=>{
            if (axios.isAxiosError(err))  {
              // Access to config, request, and response
              console.log((err as AxiosError).response?.data);
              setError((err as AxiosError).response?.data as string);
            } else {
                // Stock error
                console.log((err as Error).message)
            }
          })
        
        const userTokens = JSON.stringify(fetchUserData?.data.userToken)
        localStorage.setItem("userToken", userTokens);
        if(fetchUserData?.status === 200){
            const userPayload: IUser = {
                name: fetchUserData.data.username,
                email: emailInput,
                id: fetchUserData.data.id,
                userTokens:{...fetchUserData.data.userToken},
                favoriteLists:[...fetchUserData.data.favoriteLists],
                userImage:fetchUserData.data.userimage,
                accountSince:fetchUserData.data.accountSince,
                isAuth:true,
              };
              
            dispatch(logInUser(userPayload))
            navigate("/");

        }
        
        
    }



  return (
<div className='container text-light'>
    
    <form className='col-12 col-sm-6 mx-auto mt-5 border rounded p-5'>
        <h2 className='text-center pb-4'>Login Page</h2>
        {error &&<Alert variant={'danger'}>{error}</Alert>}
    <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input ref={email} type="email" className="form-control" id="email" aria-describedby="email" />
    
    </div>
        <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input ref={password} type="password" className="form-control" id="password" />
        <div id="password" className="form-text smallText text-light text-light">We'll never share your password with anyone else.</div>
    </div>
    <div>
        <button onClick={loginHandler} type="button" className="btn btn-success btn-pruple">Login</button>
    </div>
        <Link to={'/signup'}><h5 className="mt-3">Create account</h5></Link>
</form>
</div>
  )
}

export default UserLogin
