import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import '../App.css'
import axios from "axios";
const api = axios.create({
	baseURL: 'http://localhost:5000'
})

const Seller = () => {
	const role = window.localStorage.getItem("role");
	console.log(role);
	return (
		<div>
			<Navbar role={role} />
			<div className='video'>
				<VideoForm />
			</div>
		</div>
	);
};


const VideoForm = () => {
	const [videoUrl, setVideoUrl] = useState("");

	const [isPlaying, setIsPlaying] = useState(false);

	// Function to handle video URL submission
	const handleVideoSubmit = (e) => {
		e.preventDefault();
		setIsPlaying(true);
	};

	return (
		<div>
			<form onSubmit={handleVideoSubmit}>
				<input
					type='text'
					value={videoUrl}
					onChange={(e) => setVideoUrl(e.target.value)}
					placeholder='Enter video URL'
				/>
				<button type='submit'>Play Video</button>
			</form>
			{/* Render embedded video using react-player */}
			{isPlaying && <ReactPlayer url={videoUrl} controls />}
		</div>
	);
};
export default Seller;
