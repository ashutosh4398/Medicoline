import React, {useEffect, useState, useContext} from 'react';
import ListingCard from '../../components/ListingCard/ListingCard';
import Axios from 'axios';
import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';
import { BASEURL } from '../../shared/BASEURL';
import './ListingPage.scss';
import ListingDetailCard from '../../components/ListingCard/ListingDetailCard';
import Loader from '../../components/Loader/Loader';

const ListingPage = () => {

    const [listings, setListings] = useState([]);
    const {getToken} = useContext(TOKEN_HANDLER);
    const [listing_id, setListing_id] = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        Axios.get(`${BASEURL}/api/business/listing/`,{
            headers: {
                Authorization: `Token ${getToken()}`
            }
        })
        .then(resp => {
            setListings(resp.data);
            setLoaded(true);
        })
        .catch(err => {
            console.log(err.response)
            setLoaded(true);
        })
    }, []);

    if (listing_id) {
        return <ListingDetailCard listing_id={listing_id} setListing_id={setListing_id}/>
    }

    return (
        <div className="listing-page">
            <h2 className="heading__tertiary pb-3">Your listings</h2>
            {
                listings.length === 0? (
                    <h2>You don't have any listings created</h2>
                ): (
                    
                        loaded? (
                            <div className="listing-page--flex">
                                {
                                    listings.map(listing => (
                                        <div className="listing-card" onClick={e => setListing_id(listing.id)} key={listing.id}>
                                            <ListingCard  listing_name = {listing.listing_name} services={listing.services}/>
                                        </div>
                                        

                                        
                                    ))
                                }
                                
                            </div>
                        ) : (
                            <Loader />
                        )
                    
                    
                )
            }
            
        </div>
    );
};

export default ListingPage;