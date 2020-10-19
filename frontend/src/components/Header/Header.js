import React from 'react';
import illustration from '../../assets/illustration.png';
import Navigation from '../Navbar/Navigation';
import './Header.scss';

const Header = () => {
    return ( 
        <div className="header" id="header">
            {/* navbar space */}
            <Navigation nav_items={[
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
            <div className="header__sub">
                <div className="header__sub--left">
                    <div className="feature-box">
                        <h1 className="heading__primary text-center">Welcome to Medicoline</h1>
                        <p className="feature-box__tag-line margin-vertical-small">&mdash;: Social Media for Patients :&mdash;</p>
                        <p className="feature-box__description text-justify">
                            We at Medicoline ensure that all questions of each patients will be answered by the respective doctor and also create an environment where every patient can share their experiences with others which will constantly motivate and help to recover faster
                        </p>
                        <div className="feature-box__button-group">
                            <a href="#" className="cust_btn">Checkout Groups</a>
                            <a href="#" className="cust_btn">Disease prediction</a>
                        </div>
                    </div>
                </div>
                <div className="header__sub--right">
                    <div className="illustration">
                        <img src={illustration} alt="" className="illustration__image"/>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Header;