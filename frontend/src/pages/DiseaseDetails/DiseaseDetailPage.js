import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import DiseaseDetail from '../../components/DiseaseDetail/DiseaseDetail';
import Navigation from '../../components/Navbar/Navigation';
import Axios from 'axios';

import {BASEURL} from '../../shared/BASEURL';
import {TOKEN_HANDLER} from '../../shared/TOKEN_HANDLER';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,

} from 'reactstrap';

import './DiseaseDetailPage.scss';

const DiseaseDetailPage = (props) => {
    
    const {slug} = props.match.params;
    const {getToken, userDetails, setUserDetails} = useContext(TOKEN_HANDLER)
    const [modal, setModal] = useState(false);
    const [success, setSuccess] = useState(null);
    const toggle = () => setModal(!modal);

    const modalFeedback = (status) => {
        switch (status) {
            case 'success':
                return (
                    <Modal isOpen={modal} centered toggle={toggle}>
                        <ModalHeader className="text-center">
                            <h2 className="heading__tertiary">
                                Joined Successfully
                            </h2>
                        </ModalHeader>
                        <ModalBody>
                            <p>
                                You have been Successfully added into the group.
                                You can now post your questions and share your experiences throughtout the treatment.

                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <p>Thank you!</p>
                        </ModalFooter>
                    </Modal>
                )
            
            case 'error':
                return (
                    <Modal isOpen={modal} centered toggle={toggle}>
                        <ModalHeader className="text-center">
                            <h2 className="heading__tertiary">
                                Please Login
                            </h2>
                        </ModalHeader>
                        <ModalBody>
                            <p>
                                Please login first and then you can continue with this process
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Link to="/patient/login/" className="btn cust_btn">Login</Link>
                        </ModalFooter>
                    </Modal>
                )
            default:
                break;
        }
    }

    const handleSubmit = () => {
        if (getToken()) {
            Axios.post(`${BASEURL}/api/patient/join/`,{slug: slug},{
                headers: {
                    Authorization: `Token ${getToken()}`
                }
            })
            .then(resp => {
                const {data} = resp;
                
                setUserDetails({...userDetails,groups: [...userDetails.groups,data.success]})
                
                
                // setUserDetails({...userDetails,groups: newGroups});
                setSuccess(true);
                
            })
            .catch(err => {
                console.log(err.response);
            })
        } else {
            setSuccess(false)
        }
        toggle()
        
    }

    
    

    return (
        <div>
            {
                success && success!==null ? modalFeedback('success') : modalFeedback('error') 
            }
            <Navigation classname="active" />
            <div className="disease-details">
                <span className="disease-details__component">
                    <div className="disease-details__btn-groups">
                        <Link to="/diseases/" className="btn btn-outline-primary btn-lg py-3">&larr; Back</Link>
                        <button
                        disabled={userDetails.groups.find(eachGroup => eachGroup.slug === slug)? true : false}
                        onClick={handleSubmit} className="btn cust_btn">Join Group</button>
                    </div>
                    
                    <DiseaseDetail slug = {props.match?.params?.slug}/>

                </span>
            </div>
        </div>
    );
};

export default DiseaseDetailPage;