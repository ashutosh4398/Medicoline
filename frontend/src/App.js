import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Router } from './Router';
import { TOKEN_HANDLER } from './shared/TOKEN_HANDLER';
import Axios from 'axios';
import { BASEURL } from './shared/BASEURL';

const initialState = {
	groups: [],
	posts: [],
	settings : {
		first_name: null,
		last_name: null,
		email: null,
	},
	notifications: [],
	username: null
}

function App() {
	
	const [userDetails, setUserDetails] = React.useState(initialState)

	const getToken = () => {
		const token = localStorage.getItem('token')
		if (token !== 'undefined' && token) {
			return token
		}

		return false;
	}

	const StoreToken = (token) => {
		localStorage.setItem('token',token)
	}

	const deleteToken = () => {
		setUserDetails(initialState);
		localStorage.clear();
	}

	useEffect(() => {
		if (getToken()) {
			Axios.get(`${BASEURL}/api/test/`,{
				headers: {
					Authorization: `Token ${getToken()}`
				}
			})
			.then(resp => {
				console.log(resp.data);
				setUserDetails(resp.data)
			})
			.catch(err => {
				console.log(err.response);
			})
		}
	},[]);

	return (
		<TOKEN_HANDLER.Provider
		value = {
			{
				getToken,
				deleteToken,
				StoreToken,
				userDetails,
				setUserDetails
			}
		}
		>
			<Router />
		</TOKEN_HANDLER.Provider>
	)
}

export default App;