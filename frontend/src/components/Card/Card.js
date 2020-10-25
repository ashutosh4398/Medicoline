import React from 'react';
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