import React from 'react'
import { Container } from 'react-bootstrap'
import { Link, Outlet, useResolvedPath} from 'react-router-dom'

function AccountSetting() {
    const {pathname} = useResolvedPath("");
  return (
    <div className='accountsettings pt-5'>
    <Container className='w-50 d-flex pt-5 justify-content-center border border-light rounded content'>
        <div className='list-unstyled text-dark px-3 col-5'>
        <li>
          <Link to={`${pathname}/accountinformation`}>Account</Link>
        </li>
        <li>
          <Link to={`${pathname}/uploadavatar`}>Upload profile picture</Link>
        </li>
        <li>
          <Link to={`${pathname}/uploadavatar`}>List Collection</Link>
        </li>
        </div>
        <div className='col-7'>
            <Outlet />
        </div>
    </Container>
    
    </div>
  )
}

export default AccountSetting
