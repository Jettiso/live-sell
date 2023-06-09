import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const api = axios.create({
	baseURL: "http://localhost:5000",
});

const AddProductForm = () => {
	const [productName, setProductName] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [quantity, setQuantity] = useState("");

	const handleProductNameChange = (e) => {
		setProductName(e.target.value);
	};

	const handleProductPriceChange = (e) => {
		const newPrice = e.target.value;
		if (newPrice >= 0) {
			setProductPrice(newPrice);
		}
	};

	const handleQuantityChange = (e) => {
		const newQuantity = e.target.value;
		if (newQuantity >= 0) {
			setQuantity(newQuantity);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (productPrice === "" || quantity === "") {
			console.log("Error: Product price and quantity cannot be empty.");
			// or you can update a state variable to display the error message on the UI
			return;
		}

		if (productPrice === 0 || quantity === 0) {
			console.log("Error: Product price and quantity cannot be zero.");
			// or you can update a state variable to display the error message on the UI
			return;
		}

		try {
			// Send a POST request to the backend API to add the product
			const sellerId = window.localStorage.getItem("userID");
			await api.post(`/seller/${sellerId}/createproduct`, {
				productName,
				productPrice,
				quantity,
				sellerId,
			});

			// Reset the form inputs
			setProductName("");
			setProductPrice("");
			setQuantity("");

			// Show success message or perform any other action on successful product addition
		} catch (error) {
			console.error("Failed to add product:", error);
			// Show error message or perform any other action on failed product addition
		}
	};

	return (
		<div>
			<Navbar />
			<div className='add__product'>
				<form onSubmit={handleSubmit}>
					<label htmlFor='productName'>Product Name</label>
					<input type='text' id='productName' value={productName} onChange={handleProductNameChange} />
					<label htmlFor='productPrice'>Product Price</label>
					<input type='number' id='productPrice' value={productPrice} onChange={handleProductPriceChange} />
					<label htmlFor='quantity'>Quantity</label>
					<input type='number' id='quantity' value={quantity} onChange={handleQuantityChange} />
					<button type='submit'>Add Product</button>
				</form>
			</div>
		</div>
	);
};

export default AddProductForm;
