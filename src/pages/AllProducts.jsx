import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const SellerProducts = () => {
	const [products, setProducts] = useState([]);
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		const sellerId = window.localStorage.getItem("userID");

		const getSellerProducts = async () => {
			try {
				// Replace BASE_URL with the actual base URL of your backend API
				const BASE_URL = "http://localhost:5000"; // Update this with your backend URL
				const response = await axios.get(`${BASE_URL}/seller/${sellerId}/allproducts`); // Send the sellerId in the URL
				const data = response.data;

				console.log(data);
				if (response.status === 200) {
					setProducts(data.products);
				} else {
					throw new Error(data.error);
				}
			} catch (error) {
				setErrorMsg(error.message);
			}
		};

		getSellerProducts();
	}, []);

	if (errorMsg) {
		return <div>Error: {errorMsg}</div>;
	} else {
		return (
			<div>
				<Navbar />
				<div>
					<div className='allProducts__container'>
					<h1>Seller's Products</h1>
						{products.map((product) => (
							<div className='product__wrapper'>
								<h1>{product.productName}</h1>
								<h2>${product.productPrice}</h2>
								<h2>Qty: {product.quantity}</h2>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
};

export default SellerProducts;
