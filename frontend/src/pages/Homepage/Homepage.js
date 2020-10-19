import React from 'react';
import Header from '../../components/Header/Header';
import Card from '../../components/Card/Card'

import doctor_svg from '../../assets/doctor.svg';
import patient_svg from '../../assets/patient.svg';
import pharmacy_svg from '../../assets/pharmacy.svg';
import customer_service_svg from '../../assets/customer_service.svg';
import thanks_image from '../../assets/thank-you.png';

import './Homepage.scss';

const Homepage = () => {
    return (
        <div>
            <Header />
            <div className="main-content">
                <section className="features">
                    <div className="features__holder">
                        <Card image={doctor_svg} heading={'Doctor'} description={`We have large number of doctors for handling all your questions and also share opinions on the stories shared. This will help you recover and gain more knowledge and experience about the disease.`}/>
                        <Card image={patient_svg} heading={'Patient'} 
                            description={`We always try to create a special and safe environment for patients so that they can feel comfortable in sharing their experiences and questions with each other on daily basis. `}/>
                        <Card image={pharmacy_svg} heading={'Pharmacy and more'} 
                        description={`We allow you to search for nearby pharmacy, hospitals, clinics and much more who are affiliated to us and try to offer discount for our members`}/>
                        <Card image={customer_service_svg} heading={'Services'}
                        description={`If you have any business related to medicines, we always welcome you to list your services under our domain which will benefit you as well as our patients for getting all the items during emergency.`}/>
                    </div>
                </section>
                <section className="section-about-us">
                    <div className="about-us">
                        <h2 className="heading__secondary my-5">&mdash;: About us :&mdash;</h2>
                        <p className="about-us__description">
                            We initially were a team of 4 doctors who were having great time in providing services to the patients who visit us. But from the past few years because of the rise of internet and social media, we found that most of the people were just checking online about their disease and taking medicines without knowing it's consequences. 
                            Also there are a huge number of fake social media posts related to Ayurveda and other medical practices by which the patient gets distracted and starts treatment on their own instead of consulting an Ayurveda specialist.
                            So our main aim is to answer all the queries asked by the patient instead of them searching through net and getting mislead. 
                        </p>
                    </div>
                </section>
                <section className="happy-to-help">
                    <div className="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#a2d9ff" fill-opacity="1" d="M0,64L24,69.3C48,75,96,85,144,96C192,107,240,117,288,128C336,139,384,149,432,170.7C480,192,528,224,576,250.7C624,277,672,299,720,272C768,245,816,171,864,133.3C912,96,960,96,1008,117.3C1056,139,1104,181,1152,186.7C1200,192,1248,160,1296,122.7C1344,85,1392,43,1416,21.3L1440,0L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path>
                    </svg>
                    </div>
                    <div className="middle-main">
                        
                        <div className="middle-main__left text-center">
                                <img src={thanks_image}  alt="Thanks" className="img-fluid"/>
                                <a href="https://www.freepik.com/vectors/people">People vector created by stories - www.freepik.com</a>
                        </div>
                        <div className="middle-main__right">
                            <h1 className="heading__primary text-center">Thank you</h1> 
                            <p className="middle-main__description">
                                We are glad that you read all of our features and our vision.
                                We would be more happy if you signup or login into our website. There is much more that we offer.
                                Please login and experience this positive social platform where people only talk about health not about anything related to politics
                            </p>
                            <a href="#header" className="cust_btn">Visit Top</a>
                        </div>
                    
                    </div>
                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#a2d9ff" fill-opacity="1" d="M0,64L24,69.3C48,75,96,85,144,96C192,107,240,117,288,128C336,139,384,149,432,170.7C480,192,528,224,576,250.7C624,277,672,299,720,272C768,245,816,171,864,133.3C912,96,960,96,1008,117.3C1056,139,1104,181,1152,186.7C1200,192,1248,160,1296,122.7C1344,85,1392,43,1416,21.3L1440,0L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path>
                        </svg>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Homepage;