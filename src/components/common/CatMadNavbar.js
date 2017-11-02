import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Auth from '../../lib/Auth';

const CatMadNavbar =  ({history, toggle, isOpen}) => {
  const authenticated = Auth.isAuthenticated();
  let currentUser = null;
  if (authenticated) currentUser = Auth.getPayload().userId;
  let profileLink = null;
  if(!currentUser && authenticated) return null;
  else profileLink = <Link to={`/users/${currentUser}`} >Profile</Link>;

  function logout(e) {
    e.preventDefault();
    Auth.logout();
    history.push('/');
  }

  return (
    <div >
      <Navbar id="cat-mad-navbar" expand="md">
        <NavbarBrand href="/">CatMad</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              {!currentUser && authenticated &&<NavLink href={`/users/${currentUser}`} >Profile</NavLink>}
            </NavItem>
            <NavItem>
              <NavLink href="/conversations">Inbox</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/new">Add a Cat</NavLink>
            </NavItem>
            <Link to="/index">All Cats</Link>
            <NavItem>
              <NavLink href="/login" >Login</NavLink>
            </NavItem>
            {<NavItem>
              <NavLink href="/register">Register</NavLink>
            </NavItem>}
            {authenticated && <NavItem>
              <NavLink href="#" onClick={logout}>Logout</NavLink>
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
