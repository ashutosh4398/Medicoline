import React, {useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavbarBrand,
    NavLink
} from 'reactstrap';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.png';
import illustration from '../../assets/illustration.png';
import './Header.scss';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    window.onscroll = () => {
        const top = window.scrollY;
        const header = document.querySelector('.navbar')
        if (top >= 5) {
            header.classList.add('active');
        } else {
            header.classList.remove('active');
        }
    }

    return ( 
        <div className="header">
            {/* Navigation */}
            <Navbar expand="md">
                <NavbarBrand>
                    <img src={logo} alt="Logo" className="logo"/>
                    {/* Medicoline */}
                </NavbarBrand>
                <NavbarToggler className="toggler" onClick={toggle}></NavbarToggler>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink className="nav__link" to="/">Patient</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav__link" to="/">Doctor</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav__link" to="/">Business</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
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