import React from 'react';

import './ListingCard.scss';

const ListingCard = ({listing_name, services}) => {
    return (
        
            <div className="listing-card__heading">
                <h2>{listing_name}</h2>
                <p>Services: <span>{services}</span></p>
            </div>
        
    );
};

export default ListingCard;