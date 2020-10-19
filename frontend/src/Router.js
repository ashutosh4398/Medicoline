import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import PatientLogin from './pages/Patient/PatientLogin/PatientLogin';
import PatientSignup from './pages/Patient/PatientLogin/PatientSignup';

export const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route path="/patient/login/" component={PatientLogin}/>
                <Route path="/patient/signup/" component={PatientSignup}/>
            </Switch>
        </BrowserRouter>
    )
}

