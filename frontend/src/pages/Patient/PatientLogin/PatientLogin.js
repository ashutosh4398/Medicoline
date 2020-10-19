import React from 'react';
import Navigation from '../../../components/Navbar/Navigation';
import patient_img from '../../../assets/patient.png';

import './PatientLogin.scss';
import { Link } from 'react-router-dom';

const PatientLogin = () => {
    return (
        <div>
            <Navigation classname='active' nav_items={[
                {
                    nav_item : 'Patient',
                    nav_link : '/patient/login/'
                },
                {
                    nav_item : 'Doctor',
                    nav_link : '/doctor/login/'
                },
                {
                    nav_item : 'Business',
                    nav_link : '/patient/business/'
                }
            ]} />

            <section className="patient-login">
                <div className="patient-login__login-form">
                    
                    <div className="patient-login__form">
                        <p className="form-heading">Sign in</p>
                        <p className="form-caption">
                            Stay connected and continue tackling the disease together.
                        </p>
                        <form autoComplete="off">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Please enter email address"/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Please enter your password"/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn cust_btn d-block mx-auto mt-5">Login &rarr;</button>
                            </div>
                        </form>
                        <Link to="/patient/signup/" className="form-redirect">Create an account ?</Link>
                    </div>
                    <div className="patient-login__illustration">
                        <img src={patient_img} alt="patient"/>
                        
                    </div>
                    
                </div>
            </section>
        </div>
    );
};

export default PatientLogin;