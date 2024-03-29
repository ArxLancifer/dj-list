import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios, { AxiosError } from 'axios';
import "../App.css";
import { Alert, NavDropdown } from 'react-bootstrap';
import { logOutUser } from './store/userState';
import { Fragment, useState } from 'react';
import { RootState } from './store';

function NavigationBar() {
    
    
    const {userInfo} = useSelector((state:RootState) => state.userData);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listsDisabled = userInfo.isAuth ?  "text-light": "text-secondary disabled";

    async function handleLogout(){
      const {refreshToken}:any = JSON.parse(localStorage.getItem('userToken') || '{}')
      // *NOTE* I HAVE TO ADD BEARER FOR DELETE REQUEST IN BACKEND
      const logOutRequest = await axios.post(`https://memotrack-api.onrender.com/user/logout`, {refreshToken:refreshToken}, {
        headers: {
          'Content-Type': 'application/json'
      }
      }).catch((err: Error | AxiosError)=>{
        if (axios.isAxiosError(err))  {
          // Access to config, request, and response
          setError(true);
          setTimeout(()=>{
            setError(false);
          },3000)
        } else {
            // Stock error
            setError(true);
        }
      });

      localStorage.setItem('userToken', '');
      dispatch(logOutUser())
      navigate("/login")
    }
    
  return (
    <Fragment>
    <Navbar  collapseOnSelect className='p-2' bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">
        <Nav.Link as={Link} to={"/"}>
        <img className='p-0 mx-5 memotrack-logo' src={process.env.PUBLIC_URL + '/MemotrackLogo.png'} alt="app logo"/>
        </Nav.Link> 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className='text-center ' id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
          <Nav.Link as={Link} to={"/"} className='fs-5 mx-3 text-light'>Home</Nav.Link>
            {/* <Nav.Link as={Link} to={"/userlists"} className={'fs-5 mx-3 ' + listsDisabled }>My lists</Nav.Link> */}
            <NavDropdown disabled={!userInfo.isAuth} menuVariant='dark'  className='fs-5 mx-3 listdrop' title={<span className={listsDisabled}>Lists</span>}>
                     <NavDropdown.Item eventKey="1"  as={Link} to={"/userlists"}><span  className={'fs-6 text-light'}>My lists</span></NavDropdown.Item>
                     <NavDropdown.Item eventKey="2" as={Link} to={"/publiclists"} className={'fs-6 text-light'}>Public Lists</NavDropdown.Item>
                </NavDropdown>
                {/* <Nav.Link as={Link} to={"/"} className='fs-5 mx-3 text-light'>Contact</Nav.Link> */}
            {(userInfo.isAuth === true && userInfo.name.length > 0) ? 
            
            <div className='d-flex align-items-center'>
                 <NavDropdown menuVariant='dark' className='fs-5 mx-4' title={
                    <div>
                        <div className='nav-image'>
                        {/* <span className='mt-1 nav-username'>{userInfo.name}</span> */}
                            <img className='d-block mx-auto rounded-circle' src={userInfo.userImage || `${process.env.PUBLIC_URL + '/default.png'}`} alt="user avatar" />
                            
                       
                        </div>
                    </div>
                 } id="basic-nav-dropdown">
                     <NavDropdown.Item className='fs-6' onClick={handleLogout}>Logout</NavDropdown.Item>
                     <NavDropdown.Item eventKey="3" as={Link} to="/accountsettings/accountinformation" className='fs-6'>
                        Settings
                     </NavDropdown.Item>
                </NavDropdown>
            </div>
                
           
            :
            <Nav.Link as={Link} to={"/login"} className='fs-5 mx-4 text-light'>
                Login
            </Nav.Link>
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {error && <Alert variant='danger' className=' w-50 mx-auto'>Did not log out properly</Alert>}
    </Fragment>
  );
}

export default NavigationBar;
