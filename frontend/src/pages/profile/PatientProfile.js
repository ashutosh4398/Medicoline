import React from 'react';
import Navigation from '../../components/Navbar/Navigation';
import user_default from '../../assets/user.svg';
import {Link} from 'react-router-dom';

import './PatientProfile.scss';

const PatientProfile = () => {
    return (
        <div>
            <Navigation 
            nav_items={[
                {
                    nav_item: 'Ashutosh Dhondkar',
                    nav_link: '/patient/profile/'
                },
                {
                    nav_item: 'Group',
                    nav_link: '/'
                }
            ]}
            classname="active"/>
            <div className="jumbotron">
                <div className="patient-information container">
                    <div className="patient-information__image">
                        <img src={user_default} alt="user" className="img-fluid"/>
                    </div>
                    <div className="patient-information__activity">
                        <div className="patient-information__activity--actual-activity">
                            <div className="custom-grid">
                                <div className="custom-grid__column">
                                    <h3 className="heading__tertiary">5 POSTS</h3>
                                </div>
                                <div className="custom-grid__column">
                                    <h3 className="heading__tertiary">2 COMMENTS</h3>
                                </div>
                            </div>
                        </div>
                        <div className="patient-information__activity--group-selection">
                            <label htmlFor="group-select" className="font-weight-bold">Selected Group</label>
                            <select id="group-select" className="form-control">
                                <option value="All" disabled selected>All</option>
                                <option value="Heart" >Heart</option>
                                <option value="Dental" >Dental</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* main section */}
            <div className="user-profile">
                <div className="row">
                    <div className="col-md-3 border">
                        <div className="side-nav">
                            <ul className="side-nav">
                                <li className="side-nav__item">
                                    <Link to="/patient/profile/">Write a review</Link>
                                </li>
                                <li className="side-nav__item">
                                    <Link to="/patient/profile/">Posts</Link>
                                </li>
                                <li className="side-nav__item">
                                    <Link to="/patient/profile/">Comments</Link>
                                </li>
                                <li className="side-nav__item">
                                    <Link to="/patient/profile/">Groups</Link>
                                </li>
                                <li className="side-nav__item">
                                    <Link to="/patient/profile/">Services</Link>
                                </li>
                                <li className="side-nav__item">
                                    <Link to="/patient/profile/">Settings</Link>
                                </li>
                                <li className="side-nav__item">
                                    <Link to="/patient/login/">Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-9 border">
                        <h3>Hello world</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;