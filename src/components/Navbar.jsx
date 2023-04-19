import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ role }) => {
	return (
		<div className='navbar'>
			<h1>ShopLine</h1>
			{role === "buyer" ? <BuyerNav /> : <SellerNav />}
		</div>
	);
};

const BuyerNav = () => {
	return (
		<div className='nav__items'>
			<input type='text' placeholder='search for a user or product' />
			<h2>Cart</h2>
			<h2>Profile</h2>
		</div>
	);
};

const SellerNav = () => {
	return (
		<div className='nav__items'>
			<Link to={"/products"}>
				<h2>Products</h2>
			</Link>
			<Link to={"/addproduct"}>
				<h2>Add Product</h2>
			</Link>
			<h2>Profile</h2>
		</div>
	);
};

export default Navbar;
