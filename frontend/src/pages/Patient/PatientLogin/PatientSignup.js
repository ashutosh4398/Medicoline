import React from 'react';
import Navigation from '../../../components/Navbar/Navigation';
import { Link } from 'react-router-dom';
import './PatientLogin.scss';

const PatientSignup = () => {
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
                        <p className="form-heading">Sign Up</p>
                        <p className="form-caption">
                            Create account and start your journey towards ending the disease
                        </p>
                        <form autoComplete="off">
                            <div className="form-row">
                                <div className="col-md-6 col-12 form-group">
                                    <input type="text" className="form-control" placeholder="First Name"/>
                                </div>
                                <div className="col-md-6 col-12 form-group">
                                    <input type="text" className="form-control" placeholder="Last Name"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Enter your email"/>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 col-12 form-group">
                                    <input type="password" className="form-control" placeholder="Password"/>
                                </div>
                                <div className="col-md-6 col-12 form-group">
                                    <input type="password" className="form-control" placeholder="Confirm Password"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn cust_btn d-block mx-auto mt-5">Signup &rarr;</button>
                            </div>
                        </form>
                        <Link to="/patient/login/" className="form-redirect">Already have an account ?</Link>
                    </div>
                    <div className="patient-login__illustration">
                        <div className="patient-login__info">
                            <h3 className="patient-login__info-heading">Benefits of Joining</h3>
                            <p className="patient-login__description">
                                We at Medicoline try to share only true facts about the disease and most importantly all your questions will be answered by geniune doctors.
                                So you can trust the suggestions without any doubt.
                                
                            </p>
                        </div>
                        
                        
                    </div>
                    
                </div>
            </section>
        </div>
    );
};

export default PatientSignup;