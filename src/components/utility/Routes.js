import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Home from '../common/Home';
import CatsIndex from '../cats/CatsIndex';
import CatsShow from '../cats/CatsShow';
import CatsNew from '../cats/CatsNew';
import CatsEdit from '../cats/CatsEdit';
import Profile from '../users/Profile';
import ProfileEdit from '../users/ProfileEdit';

const Routes = () => {
  return(
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route exact path="/index" component={CatsIndex} />
      <ProtectedRoute path="/new" component={CatsNew} />
      <Route exact path = "/cats/:id" component = {CatsShow} />
      <ProtectedRoute path="/cats/:id/edit" component={CatsEdit} />
      <ProtectedRoute exact path = "/users/:id" component = {Profile} />
      <ProtectedRoute path="/users/:id/edit" component={ProfileEdit} />

    </Switch>
  );
};

export default Routes;
