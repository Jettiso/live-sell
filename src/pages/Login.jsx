import React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const [_, setCookies] = useCookies("access_token");

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const result = await axios.post("http://localhost:5000/", {
				username,
				password,
			});

			setCookies("access_token", result.data.token);
			window.localStorage.setItem("userID", result.data.userID);
            window.localStorage.setItem("role", result.data.role )
			{
				if (result.data.role === "buyer") {
					navigate("/buyer");
				} else {
					navigate("/seller");
				}
			}
		} catch (error) {
			console.error("Error logging in:", error);
			setError("Failed to login. Please try again."); // Set generic error message
		}
		// Clear form fields
		setUsername("");
		setPassword("");
	};

	return (
		<div>
			<form className='login-form' onSubmit={handleSubmit}>
				{error && <p className='login-error'>{error}</p>}
				<label className='login-label' htmlFor='username'>
					Username
				</label>
				<input
					className='login-input'
					type='text'
					id='username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label className='login-label' htmlFor='password'>
					Password
				</label>
				<input
					className='login-input'
					type='password'
					id='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className='login-button' type='submit'>
					Login
				</button>
				<p>
					Don't have an account?
					<Link className='login-link' to={"/register"}>
						Register
					</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
