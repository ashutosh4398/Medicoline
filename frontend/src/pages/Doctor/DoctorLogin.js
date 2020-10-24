import React,{useState,useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navigation from '../../components/Navbar/Navigation';
import doctor_png from '../../assets/doctor.png';
import Axios from 'axios';
import './Doctor.scss';
import { BASEURL } from '../../shared/BASEURL';
import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';

const DoctorLogin = () => {

    const {StoreToken} = useContext(TOKEN_HANDLER);

    const history = useHistory();

    const [login,setLogin] = useState({
        email: '',
        password: '',
        error: ''
    })

    const formHandling = (e) => {
        e.preventDefault();
        Axios.post(`${BASEURL}/api/login/`,{
            email: login.email,
            password: login.password,
            status: 'doctor',
        })
        .then(resp => {
            if (resp.data.hasOwnProperty('token')) {
                
                StoreToken(resp.data.token)
                localStorage.setItem('role','doctor');
                history.push('/doctor/profile/');
                
            }
        })
        .catch(err => {
            if(err.response.data.hasOwnProperty('error')) {
                setLogin({...login,error: 'Account not found.'})
            }
        })
    }

    return (
        <div>
            <Navigation classname={'active'} />
            <div className="doctor-entry">
                {/* block design for login */}
                <div className="doctor-entry__block">
                    {/* flex items below */}
                    <div className="doctor-entry__form-container doctor-entry__login-container">
                        <p className="form-heading">Sign In</p>
                        <p className="form-caption">
                            Login with your credentials and make a difference in the society
                        </p>
                        <form onSubmit={formHandling}>
                            <div className="form-group">
                                <input 
                                required
                                value={login.email}
                                onChange={e => setLogin({...login,email: e.target.value})}
                                type="email" className="form-control" placeholder="Email Address" />
                            </div>

                            <div className="form-group">
                                <input 
                                required
                                value={login.password}
                                onChange={e => setLogin({...login,password: e.target.value})}
                                type="password" className="form-control" placeholder="Password" />
                                <p className="text-danger">{login.error}</p>
                            </div>

                            <div className="form-group text-center py-2">
                                <button className="btn cust_btn">Login &rarr;</button>
                            </div>

                        </form>
                        <div className="text-center">
                            <Link to="/doctor/signup/" className="form-redirect">Create a Free account ? </Link>
                        </div>
                        
                    </div>
                    <div className="doctor-entry__illustration-container">
                        <img src={doctor_png} alt="doctor" className="img-fluid"/>
                        <a className="text-center" href='https://www.freepik.com/vectors/medical'>Medical vector created by stories - www.freepik.com</a>
                    </div>
                </div>
            </div>
                  
        </div>
    );
};

export default DoctorLogin;