import React from "react";
import ReactPlayer from "react-player";

const VideoComponent = ({ index, videoUrl }) => {
	const fburl = "https://fb.watch/keKzu843pg/";
	return (
		<div className='videos__wrapper'>
			<div className='video-item'>
				<ReactPlayer
					controls
					playing={true}
                    width='100%'
                    height='100%'
					config={{
						facebook: {
							appId: "790189619095247",
							version: "v16.0",
							playerId: "2342342",
						},
					}}
					url={fburl}
				/>
			</div>
			<div className='video-item'></div>
		</div>
	);
};

export default VideoComponent;
