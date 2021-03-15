import React from 'react'
import {Nav, Navbar, Container} from "react-bootstrap";
import {NavLink, Link} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {signout} from "../../actions";

const Header = (props) => {

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signout());
    };

    const renderLoggedInLinks = () => {
        return (
            <Nav>
                <li className='nav-item'>
                    <span className='nav-link' onClick={logout}>Sign Out</span>
                </li>
            </Nav>
        )
    }

    const renderNonLoggedInLinks = () => {
        return (
            <Nav>
                <li className='nav-item'>
                    <NavLink to='/admin/signin' className='nav-link'>Sign In</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink to='/admin/signup' className='nav-link'>Sign Up</NavLink>
                </li>
            </Nav>
        )
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{zIndex: 1}}>
            <Container>
                {/*<Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>*/}
                <Link to='/admin/' className='navbar-brand'>Admin Dashboard</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">*/}
                        {/*    <NavDropdown.Item href="#actions/3.1">Action</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item href="#actions/3.2">Another actions</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Item href="#actions/3.3">Something</NavDropdown.Item>*/}
                        {/*    <NavDropdown.Divider />*/}
                        {/*    <NavDropdown.Item href="#actions/3.4">Separated link</NavDropdown.Item>*/}
                        {/*</NavDropdown>*/}
                    </Nav>
                    {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()};
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default Header;