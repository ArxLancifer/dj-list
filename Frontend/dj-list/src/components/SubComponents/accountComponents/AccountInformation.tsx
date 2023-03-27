import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

function AccountInformation() {

    const userInformation = useSelector((state:RootState)=> state.userData.userInfo);
    const date = new Date(userInformation.accountSince)

    console.log(userInformation)
  return (
    <div className='text-light'>
      <h4>Account information</h4>
      <div>
      <span className='fs-6'>Username: </span>
      <span>{userInformation.name}</span>
      </div>
      <div>
      <span className='fs-6'>Account since: </span>
      <span>{date.toLocaleDateString('en-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>
    </div>
  )
}

export default AccountInformation
