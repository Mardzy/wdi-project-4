import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';


const Navbar =  ({history}) => {

  function logout(e) {
    e.preventDefault();
    Auth.logout();
    history.push('/home');
  }

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/home">Photo App</Link>
      </div>
      <Link to="/index">All Cats</Link>
      <Link to="/new">Add a Cat</Link>
      {!Auth.isAuthenticated() && <Link to="/login" className="standard-button">Login</Link>}
      {!Auth.isAuthenticated() && <Link to="/register" className="standard-button">Register</Link>}
      {Auth.isAuthenticated() && <a href="#" className="standard-button" onClick={logout}>Logout</a>}
    </nav>
  );
};



export default withRouter(Navbar);
