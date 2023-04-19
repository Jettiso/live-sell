// RegisterForm.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css"; // Import CSS file

const api = axios.create({
	baseURL: "http://localhost:5000",
});

const RegisterForm = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		firstName: "",
		lastName: "",
		address: "",
		role: "buyer", // Default role set to 'buyer'
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Validation for empty fields
		if (
			!formData.username ||
			!formData.password ||
			!formData.firstName ||
			!formData.lastName ||
			!formData.address
		) {
			alert("All fields are required.");
			return;
		}

		// Validation for password strength
		const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
		if (!passwordRegex.test(formData.password)) {
			alert("Password must be at least 8 characters, contain at least one uppercase letter and one number.");
			return;
		}

		// Make API request using Axios
		api.post("/register", formData)
			.then((response) => {
				console.log("Registration successful:", response.data);
				// Reset form data
				setFormData({
					username: "",
					password: "",
					firstName: "",
					lastName: "",
					address: "",
					role: "buyer",
				});
			})
			.catch((error) => {
				console.error("Registration failed:", error);
			});
	};

	console.log(formData);
	return (
		<form onSubmit={handleSubmit} className='register-form'>
			<label htmlFor='username' className='form-label'>
				Username
			</label>
			<input
				type='text'
				id='username'
				name='username'
				value={formData.username}
				onChange={handleChange}
				className='form-input'
			/>
			<label htmlFor='password' className='form-label'>
				Password
			</label>
			<input
				type='password'
				id='password'
				name='password'
				value={formData.password}
				onChange={handleChange}
				className='form-input'
			/>
			<label htmlFor='firstName' className='form-label'>
				First Name
			</label>
			<input
				type='text'
				id='firstName'
				name='firstName'
				value={formData.firstName}
				onChange={handleChange}
				className='form-input'
			/>
			<label htmlFor='lastName' className='form-label'>
				Last Name
			</label>
			<input
				type='text'
				id='lastName'
				name='lastName'
				value={formData.lastName}
				onChange={handleChange}
				className='form-input'
			/>
			<label htmlFor='address' className='form-label'>
				Address
			</label>
			<input
				type='text'
				id='address'
				name='address'
				value={formData.address}
				onChange={handleChange}
				className='form-input'
			/>
			<label htmlFor='role' className='form-label'>
				Role
			</label>
			<select id='role' name='role' value={formData.role} onChange={handleChange} className='form-select'>
				<option value='buyer'>Buyer</option>
				<option value='seller'>Seller</option>
			</select>
			<button type='submit' className='form-button'>
				Register
			</button>
			<p>Already have an account? <Link to={"/login"}>Log in</Link></p>
		</form>
	);
};

export default RegisterForm;
