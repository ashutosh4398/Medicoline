import React,{useEffect, useState, useContext} from 'react';
import Axios from 'axios';
import './MyPosts.scss';
import {BASEURL} from '../../shared/BASEURL';
import {TOKEN_HANDLER} from '../../shared/TOKEN_HANDLER';
import htmlToText from 'html-to-text';
import DetailedPost from '../DetailedPost/DetailedPost';

const MyPosts = () => {

    const [allPosts,setAllPosts] = useState([]);
    const {getToken}  = useContext(TOKEN_HANDLER);
    const [isLoaded, setIsLoaded] = useState(false);
    const [detailedId, setDetailedId] = useState(null);

    

    useEffect(() => {
        Axios.get(`${BASEURL}/api/patient/posts/`,{
            headers: {
                Authorization: `Token ${getToken()}`
            }
        })
        .then(resp => {
            setAllPosts(resp.data);
            setIsLoaded(true);
        })
        .catch(err => {
            console.log(err.response);
            setIsLoaded(true);
        })
    },[]);

    if (detailedId) {
        
        return (
            <DetailedPost post_id = {detailedId} setDetailedId={setDetailedId}/>
        )
    }

    

    return (
        <div>
        
            <h2 className="heading__tertiary pb-3">My POSTS</h2>
            {
                allPosts.map(post => (
                        <div className="my-posts" key={post.id} onClick={e => setDetailedId(post.id)}>
                            <div className="my-posts__content">
                                {htmlToText.fromString(post.post)}
                            </div>
                            <div className="my-posts__group">
                                <p>
                                    Group: <span>{post.group}</span>
                                </p>
                                <p>
                                    Posted on: <span>{post.date}</span>
                                </p>
                                <p>
                                    Comments: <span>{post.comments}</span>
                                </p>
                            </div>
                        </div>
                    ))
            }           

            
        </div>
    );
};

export default MyPosts;