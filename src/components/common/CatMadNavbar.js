import React from 'react';
import { withRouter } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Auth from '../../lib/Auth';

const CatMadNavbar =  ({history, toggle, isOpen}) => {
  const authenticated = Auth.isAuthenticated();
  let currentUser = null;
  if (authenticated) currentUser = Auth.getPayload().userId;


  function logout(e) {
    e.preventDefault();
    Auth.logout();
    history.push('/');
  }

  return (
    <div >
      <Navbar id="cat-mad-navbar" expand="md">
        <NavbarBrand href="/"><img src="/assets/images/cat-icon.png"/> Cat Mad</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              {currentUser && authenticated &&<NavLink href={`/users/${currentUser}`} >Profile</NavLink>}
            </NavItem>
            <NavItem>
              {authenticated &&<NavLink href="/conversations">Inbox</NavLink>}
            </NavItem>
            <NavItem>
              {authenticated &&<NavLink href="/new">Add a Cat</NavLink>}
            </NavItem>
            <NavItem>
              <NavLink href="/index">All Cats</NavLink>
            </NavItem>
            <NavItem>
              {!authenticated &&<NavLink href="/login" >Login</NavLink>}
            </NavItem>
            {<NavItem>
              {!authenticated &&<NavLink href="/register">Register</NavLink>}
            </NavItem>}
            {authenticated && <NavItem>
              {authenticated &&<NavLink href="#" onClick={logout}>Logout</NavLink>}
            </NavItem>}

          </Nav>
        </Collapse>
      </Navbar>
      {/* {authenticated && currentUser && profileLink}
      {authenticated && <Link to="/conversations">Inbox</Link>}
      {authenticated && <Link to="/new">Add a Cat</Link>}
      {!authenticated && <Link to="/login" >Login</Link>}
      {!authenticated && <Link to="/register" >Register</Link>}
      {authenticated && <a href="#" onClick={logout}>Logout</a>} */}
    </div>
  );
};



export default withRouter(CatMadNavbar);
