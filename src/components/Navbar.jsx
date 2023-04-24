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
			<Link
				to={"/"}
				onClick={(e) => {
					localStorage.clear();
				}}
			>
				<h2>Log out</h2>
			</Link>
		</div>
	);
};

const SellerNav = () => {
	return (
		<div className='nav__items'>
			<Link to={"/seller"}>
				<h2>Sell</h2>
			</Link>
			<Link to={"/seller/allproducts"}>
				<h2>Products</h2>
			</Link>
			<Link to={"/seller/addproduct"}>
				<h2>Add Product</h2>
			</Link>
			<Link
				to={"/"}
				onClick={(e) => {
					localStorage.clear();
				}}
			>
				<h2>Log out</h2>
			</Link>
		</div>
	);
};

export default Navbar;
