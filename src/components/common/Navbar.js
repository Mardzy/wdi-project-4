import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

const Navbar =  ({history}) => {
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
    <nav className="navbar">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/">CatMad</Link>
      </div>
      {authenticated && currentUser && profileLink}
      <Link to="/conversations">Inbox</Link>
      <Link to="/index">All Cats</Link>
      {authenticated && <Link to="/new">Add a Cat</Link>}
      {!authenticated && <Link to="/login" >Login</Link>}
      {!authenticated && <Link to="/register" >Register</Link>}
      {authenticated && <a href="#" onClick={logout}>Logout</a>}
    </nav>
  );
};



export default withRouter(Navbar);
