// doctor's login page
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navbar/Navigation';
import doctor_png from '../../assets/doctor.png';

import './Doctor.scss';

const DoctorSignup = () => {
    return (
        <div>
            {/* classname='active' sets the background of navbar 
                and also sets the position to sticky which helps in further designs
            */}
            <Navigation classname={'active'} />
            <div className="doctor-entry">
                {/* block design for login */}
                <div className="doctor-entry__block">
                    {/* flex items below */}
                    <div className="doctor-entry__form-container">
                        <p className="form-heading">Sign Up</p>
                        <p className="form-caption">
                            Create a free account and start sharing your knowledge for the well-being of the society
                        </p>
                        <form>
                            <div className="form-row">
                                <div className="col-12 col-sm-6 form-group">
                                    <input type="text" placeholder="First Name" className="form-control"/>
                                </div>
                                <div className="col-12 col-sm-6 form-group">
                                    <input type="text" placeholder="Last Name" className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <select placeholder="Specialization" className="form-control">
                                    <option disabled selected value="">---Please select a specialization---</option>
                                    <option value="Dentist">Dentist</option>
                                    <option value="Heart Specialist">Heart Specialist</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Mobile Number" />
                            </div>

                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email Address" />
                            </div>

                            <div className="form-row">
                                <div className="col-12 col-sm-6 form-group">
                                    <input type="password" placeholder="Enter Password" className="form-control"/>
                                </div>

                                <div className="col-12 col-sm-6 form-group">
                                    <input type="password" placeholder="Confirm Password" className="form-control"/>
                                </div>
                            </div>

                            <div className="form-group">
                                <textarea cols="30" rows="5" className="form-control" placeholder="Please enter your clinic's or hospital's address"></textarea>
                            </div>

                            <div className="form-group text-center py-2">
                                <button className="btn cust_btn">Signup &rarr;</button>
                            </div>

                        </form>
                        <div className="text-center">
                            <Link to="/doctor/login/" className="form-redirect">Already have an account ? </Link>
                        </div>
                        
                    </div>
                    <div className="doctor-entry__illustration-container">
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorSignup;