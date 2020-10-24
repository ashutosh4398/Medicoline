import React,{useState, useContext, useEffect} from 'react';
import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';
import Axios from 'axios';

import './DetailedPost.scss';
import { BASEURL } from '../../shared/BASEURL';
import Loader from '../Loader/Loader';

const DetailedPost = ({post_id, setDetailedId}) => {
    const {getToken} = useContext(TOKEN_HANDLER);
    const [post, setPost] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [commentForm, setCommentForm] = useState(null);
    const [alertNotification, setAlertNotification] = useState(false);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        Axios.get(`${BASEURL}/api/post/${post_id}/`,{
            headers: {
                Authorization: `Token ${getToken()}`
            }
        })
        .then(resp => {
            setPost(resp.data);
            setLoaded(true)
            
        })
        .catch(err => {
            setLoaded(true)
        })

        Axios.get(`${BASEURL}/api/comment/${post_id}/`,{
            headers: {
                Authorization: `Token ${getToken()}`
            }
        })
        .then(resp => {
            setComments(resp.data)
        })
        .catch(err => {
            console.log(err.response);
        })


    },[post_id]);  

    const commentFormSubmit = e => {
        e.preventDefault()
        if (commentForm?.trim()?.length < 1) {
            return;
        }

        Axios.post(`${BASEURL}/api/comment/`,{
            post_id: post_id,
            comment: commentForm,
        },{
            headers: {
                Authorization: `Token ${getToken()}`
            }
        })
        .then(resp => {
            if (resp.data.hasOwnProperty('success')) {
                setCommentForm('');
                notify();
                setComments(resp.data?.comments);
            }
        })
        .catch(err => {
            console.log(err.response);
        })
    }

    const notify = () => {
        setAlertNotification(true);
        return setTimeout(() => {
            setAlertNotification(false);
        },3000)
    }

    return (
        <>
            <h2 className="heading__tertiary pb-3">Detailed Post</h2>
            <button 
            onClick={e => setDetailedId(null)}
            className="btn btn-outline-primary btn-detailed">&larr; Back</button>
            {
                loaded? (
                    post_id? (
                        <>
                        <div className="detailed-post">
                            <div className="detailed-post__container">
                                <div className="" dangerouslySetInnerHTML={{__html: post.post}}></div>
                            </div>
                            <div className="detailed-post__description">
                                <p>Post type: <span>{post.post_type}</span></p>
                                <p>Date : <span>{post.date}</span></p>
                                <p>Group: <span>{post.group}</span></p>
                                <p>Posted By: <span>{post.posted_by}</span></p>
                            </div>
                        </div>
                        <div className="comments">
                            <div className="comments__form">
                                <h2 className="heading__tertiary py-3">Comments</h2>
                                <div className="alert alert-success"
                                style = {{display: alertNotification? 'block' : 'none'}}
                                >
                                    Comment added successfully!
                                </div>
                                <form onSubmit={commentFormSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="my-comment">Share your views</label>
                                        <textarea className="form-control" 
                                        value={commentForm}
                                        onChange = {e => setCommentForm(e.target.value)}
                                        required
                                        placeholder="Enter your comment"
                                        cols="30" rows="5"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-detailed">Post comment</button>
                                    </div>
                                </form>
                            </div>
                            {
                                comments.map(comment => (
                                    <div className="comment" key={comment.id}>
                                        <div className="comment__commented-by">
                                            <span>{comment.commented_by}</span> (<mark>{comment.is_doctor? 'Doctor' : 'Patient' }</mark>)
                                        </div>
                                        <div className="comment__comment">
                                            <p>{comment.comment}</p>
                                        </div>
                                        <div className="comment__footer">
                                            Date : <span>{comment.date}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        </>
                    ): (
                        <div className="">
                            noting to display
                        </div>
                    )
                ) : (
                    <Loader />
                )
                
            }
            
            
        </>
    )
};

export default DetailedPost;