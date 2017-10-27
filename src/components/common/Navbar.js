import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';


const Navbar =  ({history}) => {
  const authenticated = Auth.isAuthenticated();

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
      <Link to="/index">All Cats</Link>
      <Link to="/new">Add a Cat</Link>
      {!authenticated && <Link to="/login" className="standard-button">Login</Link>}
      {!authenticated && <Link to="/register" className="standard-button">Register</Link>}
      {authenticated && <a href="#" className="standard-button" onClick={logout}>Logout</a>}
    </nav>
  );
};



export default withRouter(Navbar);
