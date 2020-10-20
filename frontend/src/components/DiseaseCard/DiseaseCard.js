import React from 'react';
import { Link } from 'react-router-dom';

import './DiseaseCard.scss';

const DiseaseCard = ({disease_name, id, slug}) => {
    return (
        <div className="disease-card">
            <div className="disease-card__disease-name">
                <h3>{disease_name}</h3>
            </div>
            <div className="disease-card__description-redirect">
                <Link to={`/diseases/${slug}/`} className="cust_btn">Check out description</Link>
            </div>
        </div>
    );
};

export default DiseaseCard;