import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';
import "../App.css";
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
        <img className='w-25' src={process.env.PUBLIC_URL + '/Logo.png'} alt="app logo"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link as={Link} to={"/home"} className='fs-5 mx-2 text-light'>Home</Nav.Link>
            <Nav.Link as={Link} to={"/login"} className='fs-5 mx-2 text-light'>Login</Nav.Link>
            <Nav.Link as={Link} to={"/userlists"} className='fs-5 mx-2 text-light'>My lists</Nav.Link>
            {/* <Nav.Link className='fs-5 mx-2 text-light' ><Link to={"/signup"}>Signup</Link></Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
