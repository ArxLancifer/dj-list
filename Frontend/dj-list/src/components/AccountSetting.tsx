import React from 'react'
import { Container } from 'react-bootstrap'
import { Link, Outlet, useResolvedPath} from 'react-router-dom'

function AccountSetting() {
    const {pathname} = useResolvedPath("");
  return (
    <div className='accountsettings pt-5'>
    <Container fluid="sm" className='d-flex flex-column flex-sm-row pt-5 justify-content-center border border-light rounded content'>
        <div className='list-unstyled text-dark px-0 px-sm-3 col-12 col-sm-5'>
        <li>
          <Link to={`${pathname}/accountinformation`}>Account</Link>
        </li>
        <li>
          <Link to={`${pathname}/uploadavatar`}>Upload profile picture</Link>
        </li>
        <li>
          <Link to={`${pathname}/listcollection`}>List Collection</Link>
        </li>
        </div>
        <div className='col-12 col-sm-7 mt-4 mt-sm-0 pb-2'>
            <Outlet />
        </div>
    </Container>
    
    </div>
  )
}

export default AccountSetting
