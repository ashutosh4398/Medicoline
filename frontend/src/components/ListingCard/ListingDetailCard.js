import React,{useEffect,useState,useContext} from 'react';
import Axios from 'axios'
import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';
import './ListingCard.scss';
import Loader from '../Loader/Loader';
import { BASEURL } from '../../shared/BASEURL';

const ListingDetailCard = ({listing_id,setListing_id}) => {

    const [detailed, setDetailed] = useState();
    const {getToken} = useContext(TOKEN_HANDLER);
    const [loaded, setLoaded] = useState(false);
    console.log(`${BASEURL}/api/business/listing/${listing_id}/`);
    useEffect(() => {
        Axios.get(`${BASEURL}/api/business/listing/${listing_id}/`,{
            headers: {
                Authorization: `Token ${getToken()}`
            }
        })
        .then(resp => {
            setDetailed(resp.data)
            setLoaded(true)
        })
        .catch(err => {
            setLoaded(true)
        })
    },[]);

    return (
        
        <div className="listing-detail-card">
            <h2 className="heading__tertiary pb-3">Complete Description</h2>
            <button className="btn btn-outline-primary" onClick={e => setListing_id(null)}>&larr; Back</button>
            {
            loaded? (
                <div className="listing-detail-card__details">
                    <h3>{detailed.listing_name}</h3>
                    <p>services: {detailed.services}</p>
                    <p>Address: {detailed.country}, {detailed.state}, {detailed.city}</p>
                    <h3>Description</h3>
                    <div className="" dangerouslySetInnerHTML={{__html: detailed.description}}></div>
                </div>
            ): (
                <Loader />
            )
        }
        </div>
    );
};

export default ListingDetailCard;