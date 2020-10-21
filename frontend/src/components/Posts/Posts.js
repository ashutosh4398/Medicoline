import React,{useContext} from 'react';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Posts.scss';
import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';




const Posts = () => {

    const {userDetails} = useContext(TOKEN_HANDLER);

    return (
        <div className="post-editor">
            <h2 className="heading__tertiary">Write a new post</h2>
            <form className="my-5">
                <div className="form-row">
                    <div className="col col-md-6 form-group">
                        <label htmlFor="">Select Group</label>
                        <select className="form-control">
                            <option disabled selected>---Select Group---</option>
                            {
                                userDetails.groups.map(eachGroup => (
                                    <option id={eachGroup.id} value={eachGroup.disease_name} >{eachGroup.disease_name}</option>
                                ))
                            }    
                        </select>
                    </div>
                    <div className="col col-md-6 form-group">
                        <label htmlFor="">Post Category</label>
                        <select className="form-control">
                            <option disabled selected>---Post category---</option>
                            <option value="question">Question</option>
                            <option value="experience">Experience</option>
                        </select>
                    </div>
                    
                </div>
                <div className="form-group">
                    <CKEditor
                        className="post-editor__editor"
                        editor={ClassicEditor}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-large">POST</button>
                </div>

            </form>
           
        </div>
    );
};

export default Posts;