import React from 'react';
import {Switch, Route} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Login from '../auth/Login';
import Register from '../auth/Register';
// import CatsHome from '../cats/CatsHome';
import CatsIndex from '../cats/CatsIndex';
import CatsShow from '../cats/CatsShow';
// import CatsNew from '../cats/CatsNew';
import CatsEdit from '../cats/CatsEdit';

const Routes = () => {
  return(
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route exact path="/index" component={CatsIndex} />
      {/* <Route exact path="/home" component={CatsHome}></Route> */}
      <Route exact path = "/cats/:id" component = { CatsShow } />
      <ProtectedRoute path="/cats/:id/edit" component={CatsEdit} />
      {/* <ProtectedRoute path="/new" component={CatsNew} /> */}
    </Switch>
  );
};

export default Routes;
