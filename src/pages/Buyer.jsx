import React from "react";
import Navbar from "../components/Navbar";
import VideoComponent from "../components/VideoComponent";
import SideNav from "../components/SideNav";

const Buyer = () => {
	const role = window.localStorage.getItem("role");

	return (
		<div>
			<Navbar role={role} />
			<div className='videos__page-flex'>
					<SideNav />
				<div className='video__container'>
					<VideoComponent index={0} videoUrl="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fweb.facebook.com%2Fisagani.liporada%2Fvideos%2F179383778240623%2F&show_text=false&width=560&t=0"/>
				</div>
			</div>
		</div>
	);
};

export default Buyer;
