import React from "react";
import { Link } from "react-router-dom";

const SideNav = ( {role} ) => {
	return (
		<div className='side__navigation'>
			<Link to={'/buyer'}>
                <h2 className="side__nav-link">Home</h2>
            </Link>
			<Link to={'/buyer'}>
                <h2 className="side__nav-link">Cart</h2>
            </Link>
			<Link to={'/buyer'}>
                <h2 className="side__nav-link">Profile</h2>
            </Link>
		</div>
	);
};

export default SideNav;
