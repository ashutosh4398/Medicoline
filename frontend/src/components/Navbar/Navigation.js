import React, { useState, useEffect } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavbarBrand
} from 'reactstrap';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import './Navigation.scss';

// expects the object as a parameter of the form:
// {
    // logo: logo_variable,
    // nav_items: [
    //     {
    //         nav_item : label,
    //         nav_link : link
    //     },
    //     ..
    // ]
// }
const Navigation = ({nav_items,classname=''}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    console.log(nav_items, classname);

    useEffect(() => {
        console.log("Component mounted")
    }, []);

    window.onscroll = () => {
        const top = window.scrollY;
        const header = document.querySelector('.navbar')
        console.log(classname);
        if (top >= 5) {
            header.classList.add('active');
        } else if (classname==='active') {
            // for signup and login page where there is not much contents for scroll-y
            header.classList.add('active');
            
        } else {
            header.classList.remove('active');

        }
    }

    return (
        <Navbar expand="md" className={classname}>
            <NavbarBrand>
                <Link to="/">
                    <img src={logo} alt="Logo" className="logo"/>
                </Link>
                
                {/* Medicoline */}
            </NavbarBrand>
            <NavbarToggler className="toggler" onClick={toggle}></NavbarToggler>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    {
                        nav_items.map((eachItem,idx) => (
                            <NavItem key={idx} className="text-right">
                                <Link className="nav__link" to={eachItem.nav_link}>{eachItem.nav_item}</Link>
                            </NavItem>
                        ))
                    }
                    
                    {/* <NavItem>
                        <NavLink className="nav__link" to="/">Doctor</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav__link" to="/">Business</NavLink>
                    </NavItem> */}
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default Navigation;