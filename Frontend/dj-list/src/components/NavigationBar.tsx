import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "../App.css";
import { NavDropdown } from 'react-bootstrap';

function NavigationBar() {
    
    
    const {userInfo} = useSelector<any, any>(state => state.userData);
   
    console.log(userInfo)

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">
        <img className='w-25 p-0 mx-4' src={process.env.PUBLIC_URL + '/Logo.png'} alt="app logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link as={Link} to={"/"} className='fs-5 mx-3 text-light'>Home</Nav.Link>
            <Nav.Link as={Link} to={"/userlists"} className='fs-5 mx-3 text-light'>My lists</Nav.Link>
            {(userInfo.isAuth === true && userInfo.name.length > 0) ? 
            <Nav.Link as={Link} to={"/login"} className='fs-5 mx-5 text-info'>
                 <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                     <NavDropdown.Item>Logout</NavDropdown.Item>
                </NavDropdown>
                
            </Nav.Link>
            :
            <Nav.Link as={Link} to={"/login"} className='fs-5 mx-5 text-light'>
                Login
            </Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
