// import Axios from 'axios';
// import React,{useState, useEffect, useContext} from 'react';
// import { BASEURL } from '../../shared/BASEURL';
// import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';

// const DetailedServices = ({country,state,city}) => {
//     const [detailed, setDetailed] = useState();
//     const {getToken} = useContext(TOKEN_HANDLER);
//     const [loaded, setLoaded] = useState(false);

//     useEffect(() => {
//         Axios.get(`${BASEURL}api/business/listing/${country}/${state}/${city}/`,{
//             headers: {
//                 Authorization: `Token ${getToken()}`
//             }
//         })
//         .then(resp => {
//             setDetailed(resp.data)
//             setLoaded(true)
//         })
//         .catch(err => {
//             setLoaded(true)
//         })
//     },[]);


//     return (
//         <div>
//             <div className="listing-detail-card">
//                 <h2 className="heading__tertiary pb-3">Complete Description</h2>
//                 <button className="btn btn-outline-primary" onClick={e => setListing_id(null)}>&larr; Back</button>
//                 {
//                 loaded? (
//                     <div className="listing-detail-card__details">
//                         <h3>{detailed.listing_name}</h3>
//                         <p>services: {detailed.services}</p>
//                         <p>Address: {detailed.country}, {detailed.state}, {detailed.city}</p>
//                         <h3>Description</h3>
//                         <div className="" dangerouslySetInnerHTML={{__html: detailed.description}}></div>
//                     </div>
//                 ): (
//                     <Loader />
//                 )
//             }
//             </div>
//         </div>
//     );
// };

// export default DetailedServices;