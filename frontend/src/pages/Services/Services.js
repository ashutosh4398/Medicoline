import React,{useState, useContext, useEffect} from 'react';
import { TOKEN_HANDLER } from '../../shared/TOKEN_HANDLER';
import Axios from 'axios';

import './Services.scss';
import { BASEURL } from '../../shared/BASEURL';
import ListingCard from '../../components/ListingCard/ListingCard';
import ListingDetailCard from '../../components/ListingCard/ListingDetailCard';
const Services = () => {

    const {getToken} = useContext(TOKEN_HANDLER);
    const [universalToken, setUniversalToken] = useState(null)
    const [filter, setFilter] = useState({
        country: '',
        city: '',
        state: ''
    });

    const [services, setServices] = useState([]);

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    const [listingId, setListingId] = useState(null);

    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => setIsOpen(!isOpen);

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
        setFilter({...filter, country: e.target.value, state: '', city: ''});
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
        setFilter({...filter, state: e.target.value, city: ''});
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
        e.preventDefault()
        Axios.get(`${BASEURL}/api/business/listing/${filter.country}/${filter.state}/${filter.city}/`,{
            headers: {
                Authorization: `Token ${getToken()}`
            }
        })
        .then(resp => {
            setServices(resp.data);
            toggle();
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    if (listingId) {
        return <ListingDetailCard listing_id={listingId} setListing_id={setListingId} />
    }

    

    return (
        <div className="services">
            <h2 className="heading__tertiary pb-3">Our services</h2>
            <div className="card" style={{display: isOpen? 'block' : 'none'}}>
                <div className="card-header bg-primary text-light font-weight-bold">
                    Select Location
                </div>
                <div className="card-body">
                    <form onSubmit={formHandling}>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <select id="country" 
                            value={filter.country}
                            onChange={ChangeCountry}
                            className="form-control">
                                <option value="" disabled selected>--- Please select a country ---</option>
                                {
                                    countries.map((country,idx) => (
                                        <option value={country} key={idx} >{country}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="state">State</label>
                            <select id="state" 
                            value={filter.state}
                            onChange={ChangeState}
                            className="form-control">
                                <option value="" disabled selected>--- Please select a state ---</option>
                                {
                                    states.map((state,idx) => (
                                        <option value={state} key={idx} >{state}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <select 
                            value={filter.city}
                            onChange = {e => setFilter({...filter, city: e.target.value})}
                            id="city" className="form-control">
                                <option value="" disabled selected>--- Please select a city ---</option>
                                {
                                    cities.map((city,idx) => (
                                        <option value={city} key={idx}>{city}</option>
                                    ))
                                }
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-lg">Filter</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="" style={{display: isOpen? 'none': 'block'}}>
                <button className="btn btn-outline-primary btn-lg" onClick={toggle}>Back</button>
                {
                    services.length === 0? (
                        <h2 className="heading__tertiary my-3 py-3">Sorry we could not find services in the location specified</h2>
                    ) : (
                        <div className="services--flex">

                            {
                                services.map(service => (
                                    <div className="services__cards" onClick={e => setListingId(service.id)} key={service.id}>
                                        <div className="listing-card__heading">
                                            <h2>{service.listing_name}</h2>
                                            
                                            <p>Services: <span>{service.services}</span></p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
                
                
            </div>
        </div>
    );
};

export default Services;