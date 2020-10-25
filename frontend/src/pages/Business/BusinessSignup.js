import React,{useState, useContext} from 'react';
import Navigation from '../../components/Navbar/Navigation';
import {Link,useHistory} from 'react-router-dom';


import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { BASEURL } from '../../shared/BASEURL';
import './Business.scss';
import Axios from 'axios';
import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';

const BusinessSignup = () => {

    const [signup, setSignup] = useState({
        first_name: '',
        last_name: '',
        email: '',
        emailError: null,
        password: '',
        passwordError: null,
        confirm_password: '',
        confirm_passwordError: null,
    })

    const {getToken} = useContext(TOKEN_HANDLER)
    const history = useHistory()


    if (getToken() && localStorage.getItem('role') === 'business') {
        history.push('/business/profile/');
    }

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
                        Please login and continue growing your business
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
        const errors = {
            passwordError: null,
            confirm_passwordError: null,
            error: false,
        }

        if (signup.password.trim().length < 8) {
            errors.passwordError = 'Password too short';
            errors.error = true;
        }

        if (signup.password !== signup.confirm_password) {
            errors.confirm_passwordError = 'Passwords not matched';
            errors.error = true;
        }

        setSignup({...signup, ...errors});
        return !errors.error
        
    }

    const formHandling = (e) => {
        e.preventDefault();

        if (formValidation()) {
            Axios.post(`${BASEURL}/api/business/signup/`,{
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
        }
    }

    return (
        <div>
            {SuccessFeedBackModal()}
            <Navigation classname="active"/>
            <section className="patient-login">
                
                <div className="patient-login__login-form">
                    
                    <div className="patient-login__form">
                        
                        
                        <p className="form-heading">Sign Up</p>
                        <p className="form-caption">
                            Create account and start growing your business today!
                        </p>
                        <form autoComplete="off" onSubmit={formHandling}>
                            <div className="form-row">
                                <div className="col-md-6 col-12 form-group">
                                    <input required type="text" 
                                    className="form-control"
                                    placeholder="First Name"
                                    value={signup.first_name}
                                    onChange={e => setSignup({...signup,first_name: e.target.value})}
                                    />
                                </div>

                                <div className="col-md-6 col-12 form-group">
                                    <input required type="text" 
                                    className="form-control"
                                    placeholder="Last Name"
                                    value={signup.last_name}
                                    onChange={e => setSignup({...signup, last_name: e.target.value})}
                                    />
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
                        <Link to="/business/login/" className="form-redirect">Already have an account ?</Link>
                    </div>
                    <div className="patient-login__illustration">
                        <div className="patient-login__info">
                            <h3 className="patient-login__info-heading">Benefits of Joining</h3>
                            <p className="patient-login__description">
                                We at Medicoline always try to support local businesses under our domain which helps your business to grow and also the patients during emergency.
                            </p>
                        </div>
                        
                        
                    </div>
                    
                </div>
            </section>
        </div>
    );
};

export default BusinessSignup;