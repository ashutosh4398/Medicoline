import React, { useState, useContext, useEffect } from 'react';
import Navigation from '../../components/Navbar/Navigation';
import user_default from '../../assets/user.svg';
import {Link, Route, Switch, useHistory} from 'react-router-dom';


import Chat from '../../components/Chat/Chat';
import Notification from '../../components/Notification/Notification';
import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';
import Axios from 'axios';
import { BASEURL } from '../../shared/BASEURL';
import Posts from '../../components/Posts/Posts';
// icons for navigation open and close
import {GiHamburgerMenu} from 'react-icons/gi';
import {FaTimes} from 'react-icons/fa';


import './PatientProfile.scss';
import MyPosts from '../../components/MyPosts/MyPosts';
import ProfileDisease from '../../components/ProfileDisease/ProfileDisease';
import PatientSettings from '../../components/PatientSettings/PatientSettings';

const PatientProfile = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [currentSelected, setCurrentSelected] = useState(null);
    const toggle = () => setIsOpen(!isOpen);
    const history = useHistory();

    const {getToken,deleteToken,userDetails, setUserDetails} = useContext(TOKEN_HANDLER);

    if (!getToken()) {
        history.push('/patient/login/');
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
                    nav_link: '/patient/profile/'
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
                        <div className="patient-information__activity--group-selection">
                            <label htmlFor="group-select" className="font-weight-bold">Selected Group</label>
                            <select id="group-select" className="form-control">
                                <option value="All" disabled selected>All</option>
                                {
                                    userDetails.groups.map(eachGroup => (
                                        <option id={eachGroup.id} value={eachGroup.disease_name} >{eachGroup.disease_name}</option>
                                    ))
                                }
                                
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
                                <Link to="/patient/profile/" onClick={() => setCurrentSelected('write')}>
                                    <li className={`side-nav__item ${currentSelected === 'write'? 'side-nav__item--active' : ''}`}>
                                        Write a POST
                                    </li>
                                </Link>

                                <Link to="/patient/profile/notification/" onClick={() => setCurrentSelected('notifications')}>
                                    <li className={`side-nav__item ${currentSelected === 'notifications'? 'side-nav__item--active' : ''}`}>
                                        Notifications
                                    </li>
                                </Link>

                                <Link to="/patient/profile/my-posts/" onClick={() => setCurrentSelected('posts')}>
                                    <li className={`side-nav__item ${currentSelected === 'posts'? 'side-nav__item--active' : ''}`}>
                                        Posts
                                    </li>
                                </Link>
                                <Link to="/patient/profile/groups/" onClick={() => setCurrentSelected('groups')}>
                                    <li className={`side-nav__item ${currentSelected === 'groups'? 'side-nav__item--active' : ''}`}>
                                        Groups
                                    </li>
                                </Link>

                                <Link>
                                    <li className="side-nav__item">
                                       Chat
                                    </li>
                                </Link>

                                <Link to="/">
                                    <li className="side-nav__item">
                                        Services
                                    </li>
                                </Link>

                                <Link to="/patient/profile/settings/" onClick={e => setCurrentSelected('settings')}>
                                    <li className={`side-nav__item ${currentSelected === 'settings'? 'side-nav__item--active' : ''}`}>
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
                                <div className="profile-main-content__inner">
                                    <Switch>
                                        <Route exact path="/patient/profile/" component={Posts}/>
                                        <Route path="/patient/profile/notification/" component={Notification}></Route>
                                        <Route path="/patient/profile/my-posts/" component={MyPosts}></Route>
                                        <Route path="/patient/profile/groups/" component={ProfileDisease}/>
                                        <Route path="/patient/profile/chat/" component={Chat}></Route>
                                        <Route path="/patient/profile/settings/" component={PatientSettings}/>
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

export default PatientProfile;