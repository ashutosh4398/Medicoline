import React, {useState, useContext} from 'react';
import Navigation from '../../components/Navbar/Navigation';
import business_svg from '../../assets/business_svg.svg';
import Axios from 'axios';

import { Link, useHistory } from 'react-router-dom';
import { BASEURL } from '../../shared/BASEURL';
import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';

const BusinessLogin = () => {
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
            status: 'business'
        })
        .then(resp => {
            StoreToken(resp.data?.token);
            setLogin({...login,error: false});
            localStorage.setItem('role','business');
            history.push('/business/profile/');
        })
        .catch(err => {
            if (err.response.status === 400) {
                setLogin({...login,error: true});
            }
        })
    }

    if (getToken() && localStorage.getItem('role') === 'business') {
        history.push('/business/profile/');
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
                    nav_link : '/business/login/'
                }
            ]} />

            <section className="patient-login">
                <div className="patient-login__login-form">
                    
                    <div className="patient-login__form">
                        <p className="form-heading">Sign in</p>
                        <p className="form-caption">
                            Stay connected and continue growing.
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
                        <Link to="/business/signup/" className="form-redirect">Create an account ?</Link>
                    </div>
                    <div className="patient-login__illustration">
                        <img src={business_svg} alt="patient"/>
                        
                    </div>
                    
                </div>
            </section>
        </div>
    );
};

export default BusinessLogin;