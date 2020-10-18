import React from 'react';
import doctor_svg from '../../assets/doctor.svg';
import './Card.scss';

const Card = ({image,heading,description}) => {
    return (
        <div className="feature-card">
            <div className="feature-card__image">
                <img src={image} alt=""/>
            </div>
            <div className="feature-card__heading">
                <h2 className="heading__tertiary">{heading}</h2>
            </div>

            <div className="feature-card__description">
                <p>
                    {description}
                </p>
            </div>

        </div>
    );
};

export default Card;