import React, { useState, useContext } from 'react';
import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';
import DiseaseDetail from '../DiseaseDetail/DiseaseDetail';

import './ProfileDisease.scss';

const ProfileDisease = () => {
    const [selectedDisease, setSelectedDisease] = useState(null);
    const {userDetails} = useContext(TOKEN_HANDLER);
    return (
        <>
            {
                selectedDisease? (
                    <div className="">
                        <h2 className="heading__tertiary">Description</h2>
                        <div className="my-group">
                            <DiseaseDetail slug={selectedDisease} />
                        </div>
                        <div className="">
                            <button className="btn btn-outline-primary btn-lg mx-auto" onClick={() => setSelectedDisease(null)}>Back</button>
                        </div>
                    </div>
                ):(
                    <div>
                        <h2 className="heading__tertiary">Your Group enrollments</h2>
                        {
                            userDetails.groups.map(eachGroup => (
                                <div className="my-group" key={eachGroup.id} onClick={() => setSelectedDisease(eachGroup.slug)}>
                                    <div className="">
                                        <h4 className="my-group__heading">{eachGroup.disease_name}</h4>
                                    </div>
                                    <div className="my-group__group">
                                        <p>
                                            Members: <span>{eachGroup.members}</span>
                                        </p>
                                        <p>
                                            Posts: <span>{eachGroup.posts}</span>
                                        </p>
                                        <p>
                                            Comments: <span>{eachGroup.comments}</span>
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) 
            }
        </>
    );
};

export default ProfileDisease;