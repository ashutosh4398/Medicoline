import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navbar/Navigation';
import doctor_png from '../../assets/doctor.png';

import './Doctor.scss';

const DoctorLogin = () => {
    return (
        <div>
            <Navigation classname={'active'} />
            <div className="doctor-entry">
                {/* block design for login */}
                <div className="doctor-entry__block">
                    {/* flex items below */}
                    <div className="doctor-entry__form-container doctor-entry__login-container">
                        <p className="form-heading">Sign In</p>
                        <p className="form-caption">
                            Login with your credentials and make a difference in the society
                        </p>
                        <form>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email Address" />
                            </div>

                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password" />
                            </div>

                            <div className="form-group text-center py-2">
                                <button className="btn cust_btn">Login &rarr;</button>
                            </div>

                        </form>
                        <div className="text-center">
                            <Link to="/doctor/signup/" className="form-redirect">Create a Free account ? </Link>
                        </div>
                        
                    </div>
                    <div className="doctor-entry__illustration-container">
                        <img src={doctor_png} alt="doctor" className="img-fluid"/>
                        <a className="text-center" href='https://www.freepik.com/vectors/medical'>Medical vector created by stories - www.freepik.com</a>
                    </div>
                </div>
            </div>
                  
        </div>
    );
};

export default DoctorLogin;