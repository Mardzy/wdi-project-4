import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';


const Navbar =  ({history}) => {
  const authenticated = Auth.isAuthenticated();
  // const currentUser = Auth.getPayload().userId;
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
      {/* {authenticated && <Link to={`/users/${currentUser}`} >Profile</Link>} */}
      <Link to="/index">All Cats</Link>
      <Link to="/new">Add a Cat</Link>
      {!authenticated && <Link to="/login" >Login</Link>}
      {!authenticated && <Link to="/register" >Register</Link>}
      {authenticated && <a href="#" onClick={logout}>Logout</a>}
    </nav>
  );
};



export default withRouter(Navbar);
