import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import history from 'browserHistory';
import Project from 'Project';
import Authenticate from 'Auth/Authenticate';
import PageError from 'shared/components/PageError';
import Login from 'Auth/Login/Login';
import ProtectedRoute from './ProtectRoute';
import LoginRoute from './LoginRoute';

const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Redirect exact from="/" to="/project" />
        <Route path="/authenticate" component={Authenticate} />
        <ProtectedRoute path="/project" component={Project} />
        <LoginRoute path="/login" component={Login} />
        <Route component={PageError} />
      </Switch>
    </Router>
  );
};

export default Routes;
