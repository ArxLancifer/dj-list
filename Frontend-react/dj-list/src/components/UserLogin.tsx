import React from 'react'

function UserLogin() {
  return (
    <div>
        <div>
        <label htmlFor='username'>Username</label>
        <input id='username' type='text' placeholder='Username'></input>
        </div>
        <br></br>
        <div>
         <label htmlFor='password'>Password</label>
         <input id='password' type='text' placeholder='Password'></input>
        </div>
        <button>Login</button>
    </div>
  )
}

export default UserLogin
