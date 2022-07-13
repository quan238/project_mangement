import React from 'react';
import {Router, Switch, Route, Redirect} from 'react-router-dom';

import history from 'browserHistory';
import Project from 'Project';
import Authenticate from 'Auth/Authenticate';
import PageError from 'shared/components/PageError';
import Login from 'Auth/Login/Login';
import Register from 'Auth/Register/Register';
import ProtectedRoute from './ProtectRoute';
import LoginRoute from './LoginRoute';
import CreateProject from 'Create-Project'

const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Redirect exact from="/" to="/project"/>
                <Route path="/authenticate" component={Authenticate}/>
                <ProtectedRoute path="/project" component={Project}/>
                <ProtectedRoute path="/create-project" component={CreateProject}/>
                <LoginRoute path="/login" component={Login}/>
                <LoginRoute path="/register" component={Register}/>
                <Route component={PageError}/>
            </Switch>
        </Router>
    );
};

export default Routes;
