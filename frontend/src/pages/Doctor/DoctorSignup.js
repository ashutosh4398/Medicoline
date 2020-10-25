// doctor's login page
import React, {useState,useEffect,useContext} from 'react';
import { Link,useHistory } from 'react-router-dom';
import Navigation from '../../components/Navbar/Navigation';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap'
import Axios from 'axios';
import './Doctor.scss';
import { BASEURL } from '../../shared/BASEURL';
import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';

const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    emailError: null,
    phone: '',
    phoneError: null,
    password: '',
    passwordError: null,
    confirm_password: '',
    confirm_passwordError:null,
    address: '',
    specialization: '',
    qualification_certificate: ''
}

const DoctorSignup = () => {

    const [specializations, setSpecializations] = useState([]);
    const [signup, setSignup] = useState(initialState);
    const [alertNotification, setAlertNotification] = useState(false);

    const toggle = () => setAlertNotification(!alertNotification);

    useEffect(() => {
        Axios.get(`${BASEURL}/api/doctor/specialization/`)
        .then(resp => {
            setSpecializations(resp.data)
        })
        .catch(err => {
            alert('some error occured. Try again later')
        })
    },[]);

    const {getToken} = useContext(TOKEN_HANDLER);

    const history = useHistory()

    if(getToken() && localStorage.getItem('role')==='doctor') {
        history.push('/doctor/profile/');
    }

    const notify = () => {
        return (
            <Modal isOpen={alertNotification} centered toggle={toggle}>
                <ModalHeader>
                    <h2>SUCCESS</h2>
                </ModalHeader>
                <ModalBody>
                    <p>We have received your request. We will review and notify you once done</p>
                    <p>Thank you!</p>
                </ModalBody>
                <ModalFooter >
                    <Link to="/">
                        <button className="px-5 py-3 btn btn-primary btn-lg">About us</button>
                    </Link>
                    
                </ModalFooter>
            </Modal>
        )
    }

    const formValidation = () => {
        setSignup({...signup,passwordError:null,confirm_passwordError: null});

        const errors = {
            passwordError: null,
            confirm_passwordError: null,
            phoneError: null,
            error: null
        }
        
        const regex = /^[0-9]{10}$/;

        if (!regex.test(signup.phone)) {
            errors.phoneError = 'Invalid phone number';
            errors.error = true;
        }

        if (signup.password.trim().length < 8) {
            errors.passwordError = 1;
            errors.error = true;
        }
        if (signup.password !== signup.confirm_password) {
            errors.confirm_passwordError = 1;
            errors.error = true;
        }

        setSignup({...signup, passwordError: errors.passwordError, confirm_passwordError: errors.passwordError, phoneError: errors.phoneError})
        return errors.error;
    }

    const formHandling = e => {
        e.preventDefault();
        if(!formValidation()) {
            const fd = new FormData();
            fd.append('first_name',signup.first_name);
            fd.append('last_name',signup.last_name);
            fd.append('email',signup.email);
            fd.append('phone',signup.phone);
            fd.append('password',signup.password);
            fd.append('confirm_password',signup.confirm_password);

            fd.append('address',signup.address);
            fd.append('specialization',signup.specialization);
            fd.append('qualification_certificate',signup.qualification_certificate);
            
            Axios.post(`${BASEURL}/api/doctor/signup/`,fd)
            .then(resp => {
                const errors = {
                    phoneError: null,
                    emailError: null,
                }
                
                if (resp.data.hasOwnProperty('phone')) {
                    errors.phoneError = resp.data?.phone[0]
                }
                if (resp.data.hasOwnProperty('email')) {
                    errors.emailError = resp.data?.email[0]
                }

                setSignup({...signup,...errors});

                // success
                if (resp.data.hasOwnProperty('success')) {
                    setSignup({...signup, ...errors});
                    setSignup(initialState)  
                    toggle();
                }
                
            })
            .catch(err => {
                
                
            })
        }
        
    }

    return (
        <div>
            {/* classname='active' sets the background of navbar 
                and also sets the position to sticky which helps in further designs
            */}
            <Navigation classname={'active'} />
            
            <div className="doctor-entry">
                {notify()}
                {/* block design for login */}
                <div className="doctor-entry__block">
                    {/* flex items below */}
                    <div className="doctor-entry__form-container">
                        <p className="form-heading">Sign Up</p>
                        <p className="form-caption">
                            Create a free account and start sharing your knowledge for the well-being of the society
                        </p>
                        <form onSubmit={formHandling}>
                            
                            <div className="form-row">
                                <div className="col-12 col-sm-6 form-group">
                                    <input type="text" 
                                    required
                                    value={signup.first_name}
                                    onChange = {e => setSignup({...signup, first_name: e.target.value})}
                                    placeholder="First Name" className="form-control"/>
                                </div>
                                <div className="col-12 col-sm-6 form-group">
                                    <input 
                                    required
                                    value={signup.last_name}
                                    onChange={e => setSignup({...signup,last_name: e.target.value})}
                                    type="text" placeholder="Last Name" className="form-control"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <select 
                                required
                                value={signup.specialization}
                                onChange={e => setSignup({...signup, specialization: e.target.value})}
                                placeholder="Specialization" className="form-control">
                                    <option disabled selected value=''>---Please select a specialization---</option>
                                    {
                                        specializations.map((specialization,idx) => (
                                            <option value={specialization} key={idx}>{specialization}</option>        
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <input 
                                required
                                value = {signup.phone}
                                onChange = {e => setSignup({...signup,phone: e.target.value})}
                                type="text" className="form-control" placeholder="Mobile Number" />
                                <p className="text-danger" style={{display: signup.phoneError? 'block' : 'none'}}>{signup.phoneError}</p>
                            </div>

                            <div className="form-group">
                                <input 
                                required
                                value={signup.email}
                                onChange={e => setSignup({...signup, email: e.target.value})}
                                type="email" className="form-control" placeholder="Email Address" />
                                <p className="text-danger" style={{display: signup.emailError? 'block' : 'none'}}>{signup.emailError}</p>
                            </div>

                            <div className="form-row">
                                <div className="col-12 col-sm-6 form-group">
                                    <input type="password" 
                                    required
                                    value={signup.password}
                                    onChange={e => setSignup({...signup,password: e.target.value})}
                                    placeholder="Enter Password" className="form-control"/>
                                    <p className="text-danger" style={{display: signup.passwordError? 'block' : 'none'}}>Password too short </p>
                                </div>

                                <div className="col-12 col-sm-6 form-group">
                                    <input 
                                    required
                                    value={signup.confirm_password}
                                    onChange={e => setSignup({...signup, confirm_password: e.target.value})}
                                    type="password" placeholder="Confirm Password" className="form-control"/>
                                    <p className="text-danger" style={{display: signup.confirm_passwordError? 'block' : 'none'}}>Passwords not matched </p>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="docs">Certificate of highest qualification</label>
                                <input type="file" required 
                                
                                onChange={e => setSignup({...signup, qualification_certificate: e.target.files[0]})}
                                className="" id="docs"/>
                            </div>

                            <div className="form-group">
                                <textarea 
                                value={signup.address}
                                onChange={e => setSignup({...signup, address: e.target.value})}
                                cols="30" rows="5" className="form-control" placeholder="Please enter your clinic's or hospital's address"></textarea>
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