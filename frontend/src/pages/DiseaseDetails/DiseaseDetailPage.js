import React from 'react';
import { Link } from 'react-router-dom';
import DiseaseDetail from '../../components/DiseaseDetail/DiseaseDetail';
import Navigation from '../../components/Navbar/Navigation';
import './DiseaseDetailPage.scss';
const DiseaseDetailPage = (props) => {
    console.log(props)
    return (
        <div>
            <Navigation classname="active" />
            <div className="disease-details">
                <span className="disease-details__component">
                    <div className="disease-details__btn-groups">
                        <Link to="/diseases/" className="btn btn-outline-primary btn-lg py-3">&larr; Back</Link>
                        <button className="btn cust_btn ">Join Group</button>
                    </div>
                    
                    <DiseaseDetail slug = {props.match?.params?.slug}/>

                </span>
            </div>
        </div>
    );
};

export default DiseaseDetailPage;