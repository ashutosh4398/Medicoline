import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import Navigation from '../../components/Navbar/Navigation';
import {BASEURL} from '../../shared/BASEURL';
import DiseaseCard from '../../components/DiseaseCard/DiseaseCard';
import Loader from '../../components/Loader/Loader';
import './Diseases.scss';


const Diseases = () => {
    // array for holding the list of diseases
    const [diseaseList, setDiseaseList] = useState([])
    // loader states initially false
    const [isLoaded, setIsLoaded] = useState(false)

    // on component did mount
    useEffect(() => {
        Axios.get(`${BASEURL}/api/diseases/`)
        .then(resp => {
            // set the list of diseases
            setDiseaseList(resp.data)
            setIsLoaded(true)
        })
        .catch(err => {
            alert(err.response)
        })
    },[])

    
    return (
        <div className="">
            <Navigation classname="active"/>
            
            <div className="container">
                <div className="row my-5">

                {
                    isLoaded? (
                            diseaseList.map(disease => (
                                    <div className="col-sm-12 col-md-6 my-3">
                                        <DiseaseCard disease_name={disease.disease_name} slug={disease.slug} id={disease.id} />
                                    </div>
                                ))
                    ) : (
                        <Loader />
                    )
                }
                   
                </div>
                
            </div>
        </div>
    );
};

export default Diseases;