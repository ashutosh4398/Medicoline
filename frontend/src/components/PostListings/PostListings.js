import React, {useState, useEffect, useContext} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState,convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import Axios from 'axios';
import './PostListings.scss';
import { BASEURL } from '../../shared/BASEURL';
import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';



const PostListings = () => {

    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    const [universalToken, setUniversalToken] = useState(null)

    const [listing, setListing] = useState({
        listing_name: '',
        services: '',
        country: '',
        state: '',
        city: '',
        description: EditorState.createEmpty()
    })

    const {getToken} = useContext(TOKEN_HANDLER);

    const [para, setPara] = useState(false);

    const notify = () =>{
        setPara(true);
        return setTimeout(()=>{
            setPara(false);
        },2000)
        
    }

    // 
    useEffect(() => {
        Axios.get(`https://www.universal-tutorial.com/api/getaccesstoken`,{
            headers: {
                'api-token': 'MJFwpMwMGEpeLtmZvpYJ4Ctj2ND9Am6c9u3UP-7QKFOa7YbkWVWUtioGDF-08bxbMGY',
                'user-email': 'dhondkarashutosh@gmail.com'
            }
        })
        .then(resp => {
            setUniversalToken(resp.data?.auth_token)
        })
        .catch(err => {
            console.log("some error");
        })
    },[]);
    

    useEffect(() => {
        if (universalToken) {
            
            Axios.get(`https://www.universal-tutorial.com/api/countries/`,{
                headers: {
                    Authorization: `Bearer ${universalToken}`
                }
            })
            .then(resp => {
                const countries = resp.data?.map(country => country.country_name);
                setCountries(countries)
            })
            .catch(err => {
                console.log(err.response)
            })
        }
    },[universalToken])

    const ChangeCountry = (e) => {
        setListing({...listing, country: e.target.value, state: '', city: ''});
        if (universalToken) {
            
            Axios.get(`https://www.universal-tutorial.com/api/states/${e.target.value}`,{
                headers: {
                    Authorization: `Bearer ${universalToken}`
                }
            })
            .then(resp => {
                const states = resp.data?.map(state => state.state_name);
                setStates(states);
                setCities([])
                
            })
            .catch(err => {
                console.log(err.response)
            })
        }
    }

    const ChangeState = (e) => {
        setListing({...listing, state: e.target.value, city: ''});
        if (universalToken) {
            
            Axios.get(`https://www.universal-tutorial.com/api/cities/${e.target.value}`,{
                headers: {
                    Authorization: `Bearer ${universalToken}`
                }
            })
            .then(resp => {
                const cities = resp.data?.map(city => city.city_name);
                setCities(cities)
                
            })
            .catch(err => {
                console.log(err.response)
            })
        }
    }

    const formHandling = e => {
        e.preventDefault();
        Axios.post(`${BASEURL}/api/business/listing/`,{
            listing_name: listing.listing_name,
            services: listing.services,
            country: listing.country,
            state: listing.state,
            city: listing.city,
            description: draftToHtml(convertToRaw(listing.description.getCurrentContent()))
        },{
            headers: {
                Authorization: `Token ${getToken()}`
            }
        })
        .then(resp => {
            // reset the state
            if (resp.data.hasOwnProperty('success')) {
                setListing({
                    listing_name: '',
                    services: '',
                    country: '',
                    state: '',
                    city: '',
                    description: ''
                })
                notify()
            }
            console.log(resp.data);
            
        })
        .catch(err => {
            console.log(err);
        })
    }


    return (
        <div className="post-listing">
            <h2 className="heading__tertiary pb-3">
                create a new listing
            </h2>

            <div className="alert alert-success" 
            style={{display: para? 'block' : 'none' }}
            role="alert">
                Your post has been updated successfully!
            </div>
            
            <div className="card">
                <div className="card-header bg-primary text-light font-weight-bold">
                    Fill in all the details
                </div>
                <div className="card-body">
                    <form onSubmit={formHandling}>
                        <div className="form-group">
                            <label htmlFor="listing-name">Listing Name</label>
                            <input 
                            value={listing.listing_name}
                            onChange={e => setListing({...listing, listing_name: e.target.value})}
                            type="text" id="listing-name" placeholder="Please enter listing name" className="form-control"/>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 form-group">
                                <label htmlFor="service">Offered Service</label>
                                <select id="service" 
                                value={listing.services}
                                onChange={e => setListing({...listing, services: e.target.value})}
                                className="form-control">
                                    <option value="" disabled selected>--- Please select one type ---</option>
                                    <option value="medical">Medical</option>
                                    <option value="hospital">Hospital</option>
                                    <option value="clinic">Clinic</option>
                                </select>
                            </div>
                            <div className="col-md-6 form-group">
                                <label htmlFor="country">Country</label>
                                <select id="country" 
                                value={listing.country}
                                
                                onChange={e => ChangeCountry(e)} className="form-control">
                                    <option value="" disabled selected>--- Please select a country ---</option>
                                    {
                                        countries.map((country,idx) => (
                                            <option value={country} key={idx} >{country}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="col-md-6 form-group">
                                <label htmlFor="state">State</label>
                                <select 
                                value={listing.state}
                                id="state" onChange={e => ChangeState(e)} className="form-control">
                                    <option value="" disabled selected>--- Please select state ---</option>
                                    {
                                        states.map((state,idx) => (
                                            <option value={state} key={idx} >{state}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-md-6 form-group">
                                <label htmlFor="city">City</label>
                                <select id="city" 
                                value={listing.city}
                                onChange={e => setListing({...listing, city: e.target.value})}
                                className="form-control" >
                                    <option value="" disabled selected>--- Please select a city ---</option>
                                    {
                                        cities.map((city,idx) => (
                                            <option value={city} key={idx}>{city}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <div className="">
                            <Editor
                            toolbarClassName="editor-tool"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editor"
                            editorState={listing.description}
                            onEditorStateChange={
                                (editor) => setListing({...listing,
                                description: editor
                            })}
                            />
                            </div>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
};

export default PostListings;