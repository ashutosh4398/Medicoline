import React from 'react';
import Header from '../../components/Header/Header';
import Card from '../../components/Card/Card'

import doctor_svg from '../../assets/doctor.svg';
import patient_svg from '../../assets/patient.svg';
import pharmacy_svg from '../../assets/pharmacy.svg';
import customer_service_svg from '../../assets/customer_service.svg';

import './Homepage.scss';

const Homepage = () => {
    return (
        <div>
            <Header />
            <section className="features">
                <Card image={doctor_svg} heading={'Doctor'} description={`We have large number of doctors for handling all your questions and also share opinions on the stories shared. This will help you recover and gain more knowledge and experience about the disease.`}/>
                <Card image={patient_svg} heading={'Patient'} 
                    description={`We always try to create a special and safe environment for patients so that they can feel comfortable in sharing their experiences and questions with each other on daily basis. `}/>
                <Card image={pharmacy_svg} heading={'Pharmacy and more'} 
                description={`We allow you to search for nearby pharmacy, hospitals, clinics and much more who are affiliated to us and try to offer discount for our members`}/>
                <Card image={customer_service_svg} heading={'Services'}
                 description={`If you have any business related to medicines, we always welcome you to list your services under our domain which will benefit you as well as our patients for getting all the items during emergency.`}/>
            </section>
        </div>
    );
};

export default Homepage;