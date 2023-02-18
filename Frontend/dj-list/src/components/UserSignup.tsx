import React from 'react'


function UserLogin() {
  return (
    <div className='container'>
      <h1>Sign Up Page</h1>
    <form className='w-50 mx-auto mt-5 border rounded p-5'>
<div className="mb-3">
    <label htmlFor="username" className="form-label">Email address</label>
    <input type="text" className="form-control" id="username" aria-describedby="user name" />
    
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" />
    <div id="password" className="form-text">We'll never share your password with anyone else.</div>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
  )
}

export default UserLogin
