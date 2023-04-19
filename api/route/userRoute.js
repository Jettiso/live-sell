import express from "express";
import { UserModel } from "../models/UserModel.js";
import { ProductModel } from "../models/ProductModel.js";
const router = express.Router();

router.post("/seller/:sellerId/createproduct", async (req, res) => {
	try {
		const { sellerId } = req.params;
		const { productName, productPrice, quantity } = req.body;

		// Create a new product using the ProductModel
		const newProduct = new ProductModel({
			productName,
			productPrice,
			quantity,
			sellerId, // Add userId to the new product object
		});

		// Save the new product to the database
		await newProduct.save();

		// Populate the userId field with the corresponding user object
		await newProduct.populate("sellerId").execPopulate();

		res.status(200).json({ message: "Product saved successfully" });
	} catch (error) {
		console.error("Failed to save product:", error);
		res.status(500).json({ error: "Failed to save product" });
	}
});

router.get("/seller/:userId/allproducts", async (req, res) => {
	try {
		const { userId } = req.params;

		const user = await UserModel.findById(userId).populate("products");

		res.status(200).json({ products: user.products });
	} catch (error) {
		console.error("Failed to retrieve user products:", error);
		res.status(500).json({ error: "Failed to retrieve user products" });
	}
});

// Route to add a product from seller's products to buyer's cart
router.post("/buyer/:buyerId/cart/:productId", async (req, res) => {
	try {
		const { buyerId, productId } = req.params;

		// Find the buyer by buyerId
		const buyer = await UserModel.findById(buyerId);

		// Find the product by productId
		const product = await ProductModel.findById(productId);

		// Add the product to the buyer's cart
		buyer.cart.push(product);

		// Save the updated cart in the database
		await buyer.save();

		res.status(200).json({ message: "Product added to cart successfully" });
	} catch (error) {
		console.error("Failed to add product to cart:", error);
		res.status(500).json({ error: "Failed to add product to cart" });
	}
});

// Route to get all products in buyer's cart
router.get("/buyer/:buyerId/cart", async (req, res) => {
	try {
		const { buyerId } = req.params;

		// Find the buyer by buyerId and populate the "cart" field with products
		const buyer = await UserModel.findById(buyerId).populate("cart");

		// Extract the products from the populated "cart" field
		const products = buyer.cart;

		res.status(200).json({ products });
	} catch (error) {
		console.error("Failed to retrieve products from cart:", error);
		res.status(500).json({ error: "Failed to retrieve products from cart" });
	}
});

router.get("/", (req, res) => {
	const productName = "jet";
	const productPrice = "10000";
	const quantity = 1;
	const newProduct = new ProductModel({
		productName,
		productPrice,
		quantity,
	});
	res.status(200).json(newProduct);
});

export { router as userRouter };
