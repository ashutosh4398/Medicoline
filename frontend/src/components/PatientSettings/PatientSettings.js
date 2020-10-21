import React from 'react';
import './PatientSettings.scss';

const PatientSettings = () => {
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
                            <input type="text" className="form-control form-group" value={'Ashutosh'}/>
                        </div>
                        <div className="col-md-6 col-12">
                            <label htmlFor="firstName">Last Name</label>
                            <input type="text" className="form-control form-group" value={'Dhondkar'}/>
                        </div>
                    
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" value={'ashutoshdhondkar@gmail.com'}/>
                    </div>
                </fieldset>
            </form>

            <form>
                <fieldset className="p-5">
                    <legend className="w-auto">Change Password</legend>
                    <div className="form-group">
                        <label htmlFor="current_password">Current Password</label>
                        <input type="password" placeholder="Enter current password" className="form-control"/>
                        <small className="text-danger">Current Password not matched with our records</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input type="password" className="form-control" placeholder="Enter new password"/>
                        <small className="text-danger">Password too short</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" className="form-control"/>
                        <small className="text-danger">Passwords not matched</small>
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