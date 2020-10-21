import React,{useState, useEffect} from 'react';
import Axios from 'axios';
import { BASEURL } from '../../shared/BASEURL';
import Loader from '../Loader/Loader';
import './DiseaseDetail.scss';
import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';

// pass the slug for particulat in props 
const DiseaseDetail = ({slug}) => {
    // states
    const [details, setDetails] = useState()
    const [isloaded, setIsLoaded] = useState(false)

    

    // component did mount
    useEffect(() => {
        Axios.get(`${BASEURL}/api/disease/${slug}/`)
        .then(resp => {
            setDetails(resp.data?.description)
            setIsLoaded(true);
        })
        .catch(err => {
            console.log(err.response);
            setIsLoaded(true);
        })
    },[]);

    return (
        <div>
        {
            isloaded? (
                details? (
                    <span>
                        <div className="" dangerouslySetInnerHTML={{__html: details}}></div>
                    </span>
                ) : (
                    <span>
                        NOT FOUND
                    </span>
                )            
            ): (
                <Loader />
            )
        }
            
        </div>
    );
};

export default DiseaseDetail;