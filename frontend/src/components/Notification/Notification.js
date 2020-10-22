import React, {useEffect,useState, useContext} from 'react';
import experience_svg from '../../assets/experience.svg'
import question_svg from '../../assets/question.svg'
import comment_svg from '../../assets/comment_svg.svg'
import './Notification.scss';
import Axios from 'axios';
import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';
import { BASEURL } from '../../shared/BASEURL';
import Loader from '../Loader/Loader';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const {getToken} = useContext(TOKEN_HANDLER);
    
    useEffect(() => {
        Axios.get(`${BASEURL}/api/patient/notifications/`,{
            headers: {
                Authorization: `Token ${getToken()}`
            }
        })
        .then(resp => {
            setNotifications(resp.data);
            setLoaded(true);
        })
        .catch(err => {
            alert(err.response);
            setLoaded(true);
        })
    },[]);

    

    

    return (
        <>
            <h2 className="heading__tertiary pb-3">Notifications</h2>

            {
                loaded? (
                    notifications.map(notification => (
                        <div className="notification-card" key={notification.id}>
                            <div className="notification-card__left-side">
                                <img src={notification.notification_type === 'question'? question_svg : notification.notification_type === 'experience'? experience_svg: comment_svg} alt="" className=""/>
                            </div>
                            <div className="notification-card__right-side">
                                <p>{notification.text}</p>
                            </div>
                        </div>
                    ))
                ) : 
                (
                    <Loader />
                )
            }        

            
        </>
    );
};

export default Notification;