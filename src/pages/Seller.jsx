import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import "../App.css";
import axios from "axios";
import ReactPlayer from "react-player";
const api = axios.create({
	baseURL: "http://localhost:5000",
});

const Seller = () => {
	const role = window.localStorage.getItem("role");
	console.log(role);
	return (
		<div>
			<Navbar role={role} />
			<div className='video'>
				<VideoPlayer />
			</div>
		</div>
	);
};

const VideoPlayer = () => {
	const [url, setUrl] = useState("");

	const handleUrlChange = (e) => {
		setUrl(e.target.value);
	};

	return (
		<div className="video__player">
			<input type='text' value={url} onChange={handleUrlChange} placeholder='Enter URL' />
			{url && <ReactPlayer url={url} controls={true} />}
		</div>
	);
};

export default Seller;
