import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import DiseaseDetailPage from './pages/DiseaseDetails/DiseaseDetailPage';
import Diseases from './pages/Diseases/Diseases';
import DoctorLogin from './pages/Doctor/DoctorLogin';
import DoctorSignup from './pages/Doctor/DoctorSignup';
import Homepage from './pages/Homepage/Homepage';
import PatientLogin from './pages/Patient/PatientLogin/PatientLogin';
import PatientSignup from './pages/Patient/PatientLogin/PatientSignup';
import PatientProfile from './pages/profile/PatientProfile';
import DoctorProfile from './pages/profile/DoctorProfile';
import BusinessSignup from './pages/Business/BusinessSignup';
import BusinessLogin from './pages/Business/BusinessLogin';
import BusinessProfile from './pages/profile/BusinessProfile';

export const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route exact path="/diseases/" component={Diseases} />
                <Route path="/diseases/:slug/" component={DiseaseDetailPage} />

                <Route path="/patient/login/" component={PatientLogin}/>
                <Route path="/patient/signup/" component={PatientSignup}/>
                <Route path="/patient/profile/" component={PatientProfile}/>
                
                <Route path="/doctor/signup/" component={DoctorSignup}/>
                <Route path="/doctor/login/" component={DoctorLogin}/>
                <Route path="/doctor/profile/" component={DoctorProfile}/>

                <Route path="/business/login/" component={BusinessLogin} />
                <Route path="/business/signup/" component={BusinessSignup} />
                <Route path="/business/profile/" component={BusinessProfile}/>
                
            </Switch>
        </BrowserRouter>
    )
}

