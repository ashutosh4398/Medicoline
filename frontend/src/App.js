import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { Router } from './Router';
import { TOKEN_HANDLER } from './shared/TOKEN_HANDLER';


function App() {
	const [username, setUsername] = React.useState();

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
		setUsername('');
		localStorage.clear();
	}

	return (
		<TOKEN_HANDLER.Provider
		value = {
			{
				getToken,
				deleteToken,
				StoreToken,
				username,
				setUsername
			}
		}
		
		>
			<Router />
		</TOKEN_HANDLER.Provider>
	)
}

export default App;