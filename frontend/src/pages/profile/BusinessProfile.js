import React, { useState, useContext, useEffect } from 'react';
import Navigation from '../../components/Navbar/Navigation';
import user_default from '../../assets/user.svg';
import {Link, Route, Switch, useHistory} from 'react-router-dom';

import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';
import Axios from 'axios';
import { BASEURL } from '../../shared/BASEURL';
// icons for navigation open and close
import {GiHamburgerMenu} from 'react-icons/gi';
import {FaTimes} from 'react-icons/fa';


import './PatientProfile.scss';
import PatientSettings from '../../components/PatientSettings/PatientSettings';
import PostListings from '../../components/PostListings/PostListings';
import ListingPage from '../ListingPage/ListingPage';

const BusinessProfile = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const history = useHistory();

    const {getToken,deleteToken,userDetails, setUserDetails} = useContext(TOKEN_HANDLER);

    // only allow patients to see patient portal and nobody else
    if (!getToken() && localStorage.getItem('role') !== 'business') {
        history.push('/business/login/');
    }

    useEffect(() => {
        


        if (!userDetails.username && getToken()) {
            Axios.get(`${BASEURL}/api/test/`,{
                headers: {
                    Authorization: `Token ${getToken()}`
                }
            })
            .then(resp => {
                setUserDetails(resp.data);
            })
            .catch(err => {
                console.log(err.response);
            })
        }
        
    },[]);

    return (
        <div className="user-section">
            <Navigation 
            nav_items={[
                {
                    nav_item: userDetails?.username? `${userDetails.username}`: '',
                    nav_link: '/business/profile/'
                },
                {
                    nav_item: 'Groups',
                    nav_link: '/diseases/'
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
                    </div>
                </div>
            </div>

            {/* main section */}
            <div className="user-profile">
                <div className="user-profile__grid">
                    <div className="user-profile__column user-profile__column--sidenav">
                        <div className="">
                            <ul className="side-nav">
                                <Link to="/business/profile/">
                                    <li className='side-nav__item'>
                                        Create Listings
                                    </li>
                                </Link>

                                <Link to="/business/profile/listings/">
                                    <li className='side-nav__item'>
                                        My Listings
                                    </li>
                                </Link>

                                
                                <Link to="/business/profile/settings/" >
                                    <li className='side-nav__item'>
                                        Settings
                                    </li>
                                </Link>

                                <li className="side-nav__item" onClick={deleteToken}>
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="user-profile__column user-profile__column--main">
                        <div className='menu-label' onClick={toggle}>
                            {
                                isOpen? (
                                    <FaTimes className="icon" />
                                ) : (
                                    <GiHamburgerMenu className="icon" />
                                )
                            }
                            
                            
                        </div>
                        <div className={`bg-menu ${isOpen ? 'menu-open' : '' }`}></div>
                        <div className={`open-menu-items ${isOpen? 'open-menu-items--active' : 'open-menu-items--inactive'}`}>
                        <ul className="small-width-menu">
                                <Link to="/business/profile/" className="side-nav__item">
                                    <li onClick={toggle}>Create Listings</li>
                                </Link>
                                <Link className="side-nav__item" to="/business/profile/listings/">
                                    <li  onClick={toggle}>My Listings</li>
                                </Link>
                                <Link className="side-nav__item" to="/business/profile/settings/">
                                    <li  onClick={toggle}>Settings</li>
                                </Link>
                                <Link className="side-nav__item" to="/business/login/" onClick={deleteToken}>
                                    <li  onClick={toggle}>Logout</li>
                                </Link>
                            </ul>
                        </div>
                        <main className="profile-main-content-container">
                            <div className="profile-main-content">
                                <div className="profile-main-content__inner">
                                    <Switch>
                                        <Route exact path="/business/profile/" component={PostListings}/>
                                        <Route path="/business/profile/listings/" component={ListingPage} />
                                        <Route path="/business/profile/settings/" component={PatientSettings}/>
                                    </Switch>    
                                </div>
                                
                            </div>
                        </main>
                                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessProfile;