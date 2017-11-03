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
        <NavbarBrand href="/"><img src="/assets/images/cat-icon.png"/> <h1 className="one">C<span className="ginger">A</span><span className="black">T</span>   M<span className="ginger">A</span><span className="black">D</span></h1>
        <h1 className="two">C<span className="black">A</span><span className="white">T</span>  M<span className="black">A</span><span className="white">D</span></h1>
        <h1 className="three">C<span className="white">A</span><span className="ginger">T</span>   M<span className="white">A</span><span className="ginger">D</span></h1></NavbarBrand>
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
