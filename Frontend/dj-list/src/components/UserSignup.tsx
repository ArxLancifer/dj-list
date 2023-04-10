import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { ISignUp } from '../interfaces/UserInterfaces';

function UserLogin() {
    const [errorsState, setErrorsState] = useState<{[key:string]:string}>({});
    const [userInputs, setUserInputs] = useState<ISignUp>({username:"", email:"", password:"", password2:""});
    const navigate = useNavigate();
    
    function handleInputs(e: React.ChangeEvent<HTMLInputElement>):void{
        setUserInputs((prevUserInputs)=>{
            return {
                ...prevUserInputs,
                [e.target.id]:e.target.value
            }
        })
    }

    async function handleSignup(e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        const isValid = checkValidity(userInputs);
        if(isValid) return;
        await createAccount();

    }

    async function createAccount(){
        const postRequest = await fetch(`https://memotrack-api.onrender.com/user/signup`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userInputs)
        })
        const responseData = postRequest.json();
        if(postRequest.status === 200 ){
            navigate("/login")
        }
    }

    function checkValidity(inputs:ISignUp){
        setErrorsState({});
        const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        const validLength = !Object.values(inputs).some(input => input.length <= 5);
        const validEmail = emailRegex.test(inputs.email);
        const validPassword = inputs.password === inputs.password2 && inputs.password !== ""
        if(!validLength){
            setErrorsState((prevErrors)=>{
                return {
                    ...prevErrors,
                    "inputsLength":"Inputs must be 5 or more characters or numbers"
                }
            })
        }
        if(!validEmail){
            setErrorsState((prevErrors)=>{
                return {
                    ...prevErrors,
                    "InvalidEmail":"Email is invalid"
                }
            })
        }
        if(!validPassword){
            setErrorsState((prevErrors)=>{
                return {
                    ...prevErrors,
                    "PasswordMatch":"Passwords does not match"
                }
            })
        }
        if(!validLength && validPassword && validEmail) return true;
        return false;
    }

    return (
    <div className='container text-light'>
        <form className='w-50 mx-auto mt-5 border rounded p-5'>
            {Object.values(errorsState).map((error, index)=>{
                return <Alert key={index} variant={'danger'}>{error}</Alert>
            })}
        
            <h1 className='text-center mb-4'>Sign Up Page</h1>
        <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input onChange={handleInputs} type="text" className="form-control" id="username" aria-describedby="user name" minLength={5} maxLength={15} />
        </div>
        <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input onChange={handleInputs} type="text" className="form-control" id="email" aria-describedby="Email address" />
        </div>
        <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input onChange={handleInputs} type="password" className="form-control" id="password" />
        </div>
        <div className="mb-3">
        <label htmlFor="password2" className="form-label">Repeat Password</label>
        <input onChange={handleInputs} type="password" className="form-control" id="password2" />
        <div id="password2" className="form-text smallText text-light text-light">We'll never share your password with anyone else.</div>
        </div>
        <button onClick={handleSignup} className="btn btn-success">Signup</button>
        </form>
    </div>
  )
}

export default UserLogin
