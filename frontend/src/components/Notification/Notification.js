import React from 'react';
import experience_svg from '../../assets/experience.svg'
import question_svg from '../../assets/question.svg'
import './Notification.scss';

const Notification = () => {
    return (
        <>
            <h2 className="heading__tertiary pb-3">Notifications</h2>
            <div className="notification-card">
                <div className="notification-card__left-side">
                    <img src={experience_svg} alt="" className=""/>
                </div>
                <div className="notification-card__right-side">
                    <p>Ashutosh Dhondkar has shared a new experience in Heart group. Click to view.</p>
                </div>
            </div>

            <div className="notification-card">
                <div className="notification-card__left-side">
                    <img src={question_svg} alt="" className=""/>
                </div>
                <div className="notification-card__right-side">
                    <p>Ashutosh Dhondkar has asked a new question in Heart group</p>
                </div>
            </div>
        </>
    );
};

export default Notification;