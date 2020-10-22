import React,{useEffect, useState, useContext} from 'react';
import Axios from 'axios';
import './MyPosts.scss';
import {BASEURL} from '../../shared/BASEURL';
import {TOKEN_HANDLER} from '../../shared/TOKEN_HANDLER';
import Loader from '../Loader/Loader';
import htmlToText from 'html-to-text';

const MyPosts = () => {

    const [allPosts,setAllPosts] = useState([])
    const {getToken}  = useContext(TOKEN_HANDLER)
    const [isLoaded, setIsLoaded] = useState(false);

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

    return (
        <div>
            <h2 className="heading__tertiary pb-3">My POSTS</h2>
            {/* {
                isLoaded? (
                    allPosts.map(post => (
                        <div className="my-posts" key={post.id}>
                            <div className="my-posts__content">
                                <span dangerouslySetInnerHTML={{_html:post.post}}></span>
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
                ) : (
                    <Loader />
                )
            } */}

            {
                allPosts.map(post => (
                        <div className="my-posts" key={post.id}>
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