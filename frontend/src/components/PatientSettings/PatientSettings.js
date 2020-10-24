import React,{useContext, useState} from 'react';
import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';
import {BASEURL} from '../../shared/BASEURL';
import Axios from 'axios';
import './PatientSettings.scss';

const PatientSettings = () => {

    const {userDetails,getToken} = useContext(TOKEN_HANDLER);

    const [passwordSettings, setPasswordSettings] = useState({
        password: '',
        confirm_password: '',
        new_password: '',
        error: null
    });

    const [showAlert, setShowAlert] = React.useState(false);

    const onSuccess = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        },3000)
    }

    const formHandling = (e) => {

        e.preventDefault();
        

        // basic validation before API call
        if (passwordSettings.new_password.trim().length < 8) {
            setPasswordSettings({...passwordSettings,error: 1})
            return;
        } else if (passwordSettings.new_password !== passwordSettings.confirm_password) {
            setPasswordSettings({...passwordSettings, error: 2})
            return;
        }


        Axios.put(`${BASEURL}/api/change/password/`,{
            old_password: passwordSettings.password,
            confirm_password: passwordSettings.confirm_password,
            new_password: passwordSettings.new_password
        },{
            headers: {
                Authorization: `Token ${getToken()}`
            }
        })
        .then(resp => {
            console.log(resp.data);
            if (resp.data.hasOwnProperty('success')) {
                setPasswordSettings({
                    password: '',
                    confirm_password: '',
                    new_password: '',
                    error: null
                });
                onSuccess();
            }
            
        })
        .catch(err => {
            console.log(err.response);
            if (err.response?.data.hasOwnProperty('error')) {
                if(err.response.data.error === "password less than 8") {
                    setPasswordSettings({...passwordSettings,error: 1})
                } else if(err.response.data.error === "passwords not matched") {
                    setPasswordSettings({...passwordSettings, error: 2});
                } else if (err.response.data.error === "incorrect password") {
                    setPasswordSettings({...passwordSettings,error: 3});
                }
            }
        })

    }

    return (
        <div className="settings">
            <h2 className="heading__tertiary">
                Settings
            </h2>
            <form className="mt-5">
                <fieldset className="p-5">
                    <legend className="w-auto">Personal settings</legend>
                    <div className="form-row">
                        <div className="col-md-6 col-12">
                            <label htmlFor="firstName">First Name</label>
                            <input disabled type="text" value={userDetails.settings?.first_name} className="form-control form-group"/>
                        </div>
                        <div className="col-md-6 col-12">
                            <label htmlFor="firstName">Last Name</label>
                            <input disabled type="text" value={userDetails.settings?.last_name} className="form-control form-group"/>
                        </div>
                    
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input disabled type="email" value={userDetails.settings?.email} className="form-control"/>
                    </div>
                </fieldset>
            </form>

            <form onSubmit={formHandling}>
                <fieldset className="p-5">
                    <legend className="w-auto">Change Password</legend>
                    <div className="form-group" style={{display: showAlert? 'block' : 'none'}}>
                        <div className="alert alert-success">
                            Password Changed Successfully!
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="current_password">Current Password</label>
                        <input type="password"
                        value={passwordSettings.password}
                        onChange = {e => setPasswordSettings({...passwordSettings, password: e.target.value})}
                         placeholder="Enter current password" className="form-control"/>
                        <small className="text-danger" style={{display: passwordSettings.error === 3? 'block': 'none'}}>Current Password not matched with our records</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input type="password"
                        value={passwordSettings.new_password}
                        onChange={e => setPasswordSettings({...passwordSettings, new_password: e.target.value})}
                         className="form-control" placeholder="Enter new password"/>
                        <small className="text-danger" style={{display: passwordSettings.error === 1? 'block': 'none'}}>Password too short</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                        value={passwordSettings.confirm_password}
                        onChange={e => setPasswordSettings({...passwordSettings, confirm_password: e.target.value})}
                        type="password" placeholder="Confirm Password" className="form-control"/>
                        <small className="text-danger" style={{display: passwordSettings.error === 2? 'block': 'none'}}>Passwords not matched</small>
                    </div>
                    <div className="form-group text-center">
                        <button className="btn btn-success btn-lg px-5 py-4">CHANGE PASSWORD</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default PatientSettings;