import React,{useContext, useState} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState,convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import './Posts.scss';
import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';
import Axios from 'axios';
import { BASEURL } from '../../shared/BASEURL';



const Posts = () => {

    const {userDetails,getToken} = useContext(TOKEN_HANDLER);
    const [postDetails, setPostDetails] = useState({
        post_type: '',
        disease_name: '',
        post: EditorState.createEmpty()
    })

    
    const [para, setPara] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        console.log(postDetails);
        Axios.post(`${BASEURL}/api/post/`,{
            post_type: postDetails.post_type,
            disease_name: postDetails.disease_name,
            post: draftToHtml(convertToRaw(postDetails.post.getCurrentContent()))
        },{
            headers: {
                Authorization: `Token ${getToken()}`
            }
        })
        .then(resp => {
            // reset the state
            if (resp.data.hasOwnProperty('success')) {
                notify()
            }
            
            setPostDetails({
                post_type: '',
                disease_name: '',
                post: ''
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    const notify = () =>{
        setPara(true);
        return setTimeout(()=>{
            setPara(false);
        },2000)
        
    }

    return (
        <div className="post-editor">
            <h2 className="heading__tertiary">Write a new post</h2>

            <div className="alert alert-success" 
            style={{display: para? 'block' : 'none' }}
            role="alert">
                Your post has been updated successfully!
            </div>
            
            <form className="my-5" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="col col-md-6 form-group">
                        <label htmlFor="">Select Group</label>
                        <select 
                        value={postDetails.disease_name}
                        onChange={e => setPostDetails({...postDetails,disease_name: e.target.value})}
                        className="form-control">
                            <option disabled selected value="">---Select Group---</option>
                            {
                                userDetails.groups.map(eachGroup => (
                                    <option id={eachGroup.id} value={eachGroup.disease_name} >{eachGroup.disease_name}</option>
                                ))
                            }    
                        </select>
                    </div>
                    <div className="col col-md-6 form-group">
                        <label htmlFor="">Post Category</label>
                        <select 
                        // value={postDetails.editorState}
                        onChange={e=> setPostDetails({...postDetails,post_type:e.target.value})}
                        className="form-control">
                            <option disabled selected value="">---Post category---</option>
                            <option value="question">Question</option>
                            <option value="experience">Experience</option>
                        </select>
                    </div>
                    
                </div>
                <div className="form-group">

                    <Editor
                    toolbarClassName="editor-tool"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editor"
                    editorState={postDetails.post}
                    onEditorStateChange={
                        (editor) => setPostDetails({...postDetails,
                        post: editor
                    })}
                    />

                </div>
                <div className="form-group">
                    <button 
                    className="btn btn-primary btn-large">POST</button>
                </div>

            </form>
           
        </div>
    );
};

export default Posts;