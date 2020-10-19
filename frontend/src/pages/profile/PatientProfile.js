import React, { useState } from 'react';
import Navigation from '../../components/Navbar/Navigation';
import user_default from '../../assets/user.svg';
import {Link, Route, Switch} from 'react-router-dom';

import './PatientProfile.scss';
import Chat from '../../components/Chat/Chat';
import Notification from '../../components/Notification/Notification';

const PatientProfile = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="user-section">
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
                <div className="user-profile__grid">
                    <div className="user-profile__column user-profile__column--sidenav">
                        <div className="">
                            <ul className="side-nav">
                                <li className="side-nav__item">
                                    <Link to="/patient/profile/">Write a POST</Link>
                                </li>
                                <li className="side-nav__item">
                                    <Link to="/patient/profile/notification/">Notifications</Link>
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
                                    <Link to="/patient/profile/chat/">Chat</Link>
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
                    <div className="user-profile__column user-profile__column--main">
                        <div className='menu-label' onClick={toggle}>Menu</div>
                        <div className={`bg-menu ${isOpen ? 'menu-open' : '' }`}></div>
                        <div className={`open-menu-items ${isOpen? 'open-menu-items--active' : 'open-menu-items--inactive'}`}>
                            <ul>
                                <li onClick={toggle}>Write a post</li>
                                <li onClick={toggle}>Notifications</li>
                                <li onClick={toggle}>Posts</li>
                                <li onClick={toggle}>Comments</li>
                                <li onClick={toggle}>Groups</li>
                                <li onClick={toggle}>Services</li>
                                <li onClick={toggle}>Settings</li>
                                <li onClick={toggle}>Logout</li>
                            </ul>
                        </div>
                        <main className="profile-main-content-container">
                            <div className="profile-main-content">
                                <Switch>
                                    <Route exact path="/patient/profile/notification/" component={Notification}></Route>
                                    <Route exact path="/patient/profile/chat/" component={Chat}></Route>
                                </Switch>
                            </div>
                        </main>
                                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfile;