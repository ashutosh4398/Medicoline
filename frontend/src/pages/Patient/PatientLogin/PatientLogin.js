import React, {useState, useContext} from 'react';
import Navigation from '../../../components/Navbar/Navigation';
import patient_img from '../../../assets/patient.png';
import Axios from 'axios';
import './PatientLogin.scss';
import { Link, useHistory } from 'react-router-dom';
import { BASEURL } from '../../../shared/BASEURL';
import { TOKEN_HANDLER } from '../../../shared/TOKEN_HANDLER';

const PatientLogin = () => {
    const [login, setLogin] = useState({
        email: '',
        password: '',
        error: '',
    })

    const {StoreToken, getToken} = useContext(TOKEN_HANDLER);

    const history = useHistory();

    const formHandling = e => {
        e.preventDefault();
        // make an api call
        Axios.post(`${BASEURL}/api/login/`, {
            email: login.email,
            password: login.password,
            status: 'patient'
        })
        .then(resp => {
            StoreToken(resp.data?.token);
            setLogin({...login,error: false});
            history.push('/patient/profile/');
        })
        .catch(err => {
            if (err.response.status === 400) {
                setLogin({...login,error: true});
            }
        })
    }

    if (getToken()) {
        history.push('/patient/profile/');
    }

    return (
        <div>
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
                        <p className="form-heading">Sign in</p>
                        <p className="form-caption">
                            Stay connected and continue tackling the disease together.
                        </p>
                        <form autoComplete="off" onSubmit={formHandling}>
                            <div className="form-group">
                                <input type="text" 
                                required
                                value={login.email}
                                onChange={e => setLogin({...login, email: e.target.value})}
                                className="form-control" placeholder="Please enter email address"/>
                            </div>
                            <div className="form-group">
                                <input 
                                required
                                value={login.password}
                                onChange={e => setLogin({...login,password: e.target.value})}
                                type="password" className="form-control" placeholder="Please enter your password"/>
                                <p className={`${login.error? 'text-danger': 'd-none' }`}>Either email or password is incorrect</p>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn cust_btn d-block mx-auto mt-5">Login &rarr;</button>
                            </div>
                        </form>
                        <Link to="/patient/signup/" className="form-redirect">Create an account ?</Link>
                    </div>
                    <div className="patient-login__illustration">
                        <img src={patient_img} alt="patient"/>
                        
                    </div>
                    
                </div>
            </section>
        </div>
    );
};

export default PatientLogin;