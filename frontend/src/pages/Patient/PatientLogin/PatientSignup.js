import React,{useState} from 'react';
import Navigation from '../../../components/Navbar/Navigation';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { BASEURL } from '../../../shared/BASEURL';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from 'reactstrap'

import './PatientLogin.scss';
const initialState = {
    first_name: '',
    first_nameError: '',
    last_name: '',
    last_nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    confirm_password: '',
    confirm_passwordError: '',
    error: false,
}

const PatientSignup = () => {

    const [signup, setSignup] = useState(initialState);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const SuccessFeedBackModal = () => {
        return (
            <Modal isOpen={modal} toggle={toggle} centered>
                <ModalHeader className="text-center" toggle={toggle}>
                    <h1 className="text-center">Signup Successful</h1>
                </ModalHeader>
                <ModalBody>
                    <p className="modal-p">
                        Please login and experience a positive reform in social media
                    </p>
                </ModalBody>
                <ModalFooter className="text-center">
                    <Link to="/patient/login/" className="modal-p">
                        <Button color="primary" className="modal-p d-block mx-auto">Login</Button>
                    </Link>
                </ModalFooter>
            </Modal>
        )
        
    }
    

    const formValidation = () => {
        // basic form validation
        const errorState = {
            first_nameError: null,
            last_nameError: null,
            emailError: null,
            passwordError: null,
            confirm_passwordError: null,
            error: false,
        }

        // regex for only alphabets
        const regex = /[a-zA-Z]+/;
        if (!regex.test(signup.first_name)) {
            errorState.first_nameError = true;
            errorState.error = true;
        }
        if (!regex.test(signup.last_name)) {
            errorState.last_nameError = true;
            errorState.error = true;
        }

        if (signup.password.trim().length < 8) {
            errorState.passwordError = 'Password too small';
            errorState.error = true;
        }

        if (signup.password !== signup.confirm_password) {
            errorState.confirm_passwordError = 'Passwords not matched';
            errorState.error = true;
        }

        // 
        setSignup({...signup,...errorState});
        console.log(errorState.error);
        return !errorState.error;
        
    }

    const formHandling = e => {
        e.preventDefault();
        if (formValidation()){ 
            
            // if the form is valid then make an api call
            Axios.post(`${BASEURL}/api/patient/signup/`,{
                first_name: signup.first_name,
                last_name: signup.last_name,
                email: signup.email,
                password: signup.password,
                confirm_password: signup.confirm_password
            })
            .then(resp => {
                const {data} = resp;
                if (data.hasOwnProperty('email')) {
                    setSignup({...signup, emailError: 'Email already taken'})
                }

                if (data.hasOwnProperty('success')) {
                    // account created successfully.
                    // display the modal popup 
                    toggle()
                }
            })
            .catch(err => {
                console.log(err.response);
            })
        } else {
            return;
        }
    }


    return (
        <div>
            {SuccessFeedBackModal()}
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
                        <form autoComplete="off" onSubmit={formHandling}>
                            <div className="form-row">
                                <div className="col-md-6 col-12 form-group">
                                    <input required type="text" 
                                    value={signup.first_name}
                                    onChange={e => setSignup({...signup,first_name: e.target.value})}
                                    className={`form-control ${signup.first_nameError? 'border-danger' : ''}`} placeholder="First Name"/>
                                    <p className={`${signup.first_nameError? 'text-danger': 'd-none' }`}>Please enter alphabets only</p>
                                </div>

                                <div className="col-md-6 col-12 form-group">
                                    <input required type="text" 
                                    value={signup.last_name}
                                    onChange={e => setSignup({...signup, last_name: e.target.value})}
                                    className={`form-control ${signup.last_nameError? 'border-danger' : ''}`}
                                     placeholder="Last Name"/>
                                    <p className={`${signup.last_nameError? 'text-danger': 'd-none' }`}>Please enter alphabets only</p>
                                </div>
                                
                            </div>
                            
                            <div className="form-group">
                                <input 
                                value={signup.email}
                                onChange={e => setSignup({...signup,email: e.target.value})}
                                required type="email" 
                                className={`form-control ${signup.emailError? 'border-danger' : ''}`}
                                placeholder="Enter your email"/>
                                <p className={`${signup.emailError? 'text-danger': ''}`}>{signup.emailError}</p>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6 col-12 form-group">
                                    <input required 
                                    value={signup.password}
                                    onChange={e => setSignup({...signup, password: e.target.value})}
                                    type="password"  
                                    className={`form-control ${signup.passwordError? 'border-danger' : ''}`}
                                    placeholder="Password"/>
                                    <p className={`${signup.passwordError? 'text-danger': ''}`}>{signup.passwordError}</p>
                                </div>
                                <div className="col-md-6 col-12 form-group">
                                    <input 
                                    value={signup.confirm_password}
                                    onChange={e => setSignup({...signup,confirm_password: e.target.value})}
                                    required type="password" 
                                    className={`form-control ${signup.confirm_passwordError? 'border-danger' : ''}`}
                                    placeholder="Confirm Password"/>
                                    <p className={`${signup.confirm_passwordError? 'text-danger': ''}`}>{signup.confirm_passwordError}</p>
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