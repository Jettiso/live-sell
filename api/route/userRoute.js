import express from "express";
import { UserModel } from "../models/UserModel.js";
import ProductModel from "../models/ProductModel.js";
import algoliasearch from "algoliasearch";

const router = express.Router();

const client = algoliasearch("906CVGAQRF", "32d618d196d9e157f3c7245b027db157");

const index = client.initIndex("someindex");


// get all users
const getusers =  async () => {
	const users = await UserModel.find({})
	// console.log(users)
	return users
}

const saveRecords = async () => {

	await index.saveObjects(getusers, { autoGenerateObjectIDIfNotExist: true })
}

saveRecords()

// Add a product
router.post("/seller/:sellerId/createproduct", async (req, res) => {
	try {
		const { sellerId } = req.params;
		const { productName, productPrice, quantity } = req.body;

		// Create a new product using the ProductModel
		const user = await UserModel.findById(sellerId);
		const newProduct = new ProductModel({
			productName,
			productPrice,
			quantity,
			sellerId: user, // Add sellerId to the new product object
		});

		// Save the new product to the database

		await newProduct.save();
		user.products.push(newProduct);
		await user.save();
		console.log(newProduct);
		res.status(200).json({ message: "Product saved successfully" });
	} catch (error) {
		console.error("Failed to save product:", error);
		res.status(500).json({ error: "Failed to save product" });
	}
});

// All products from  a seller's inventory
router.get("/seller/:sellerId/allproducts", async (req, res) => {
	try {
		const { sellerId } = req.params;

		// Find the corresponding user in the UserModel and populate the products field
		const user = await UserModel.findById(sellerId).populate({
			path: "products",
			model: ProductModel,
		});

		console.log(user);
		res.status(200).json({ products: user.products });
	} catch (error) {
		console.error("Failed to retrieve user products:", error);
		res.status(500).json({ error: "Failed to retrieve user products" });
	}
});

// Delete a product from a seller's inventory
router.delete("/seller/:sellerId/deleteproduct/:productId", async (req, res) => {
	try {
		const { sellerId, productId } = req.params;

		// Find the corresponding user in the UserModel
		const user = await UserModel.findById(sellerId);

		// Find the product to be deleted by ID and remove it from the seller's inventory
		const product = await ProductModel.findById(productId);
		if (!product) {
			throw new Error("Product not found");
		}

		if (product.sellerId.toString() !== sellerId) {
			throw new Error("You are not authorized to delete this product");
		}

		await product.remove();
		user.products.pull(product);
		await user.save();

		res.status(200).json({ message: "Product deleted successfully" });
	} catch (error) {
		console.error("Failed to delete product:", error);
		res.status(500).json({ error: "Failed to delete product" });
	}
});

// ====================Buyer
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

// Define API route to fetch data
router.get("/api/video/:videoId", (req, res) => {
	const videoId = req.params.videoId;
	// Fetch data from the backend using videoId and send it as response
	// ... fetch data logic here
	const videoData = {
		title: "Video Title",
		url: `https://www.youtube.com/watch?v=${videoId}`,
		// ... other data fields
	};
	res.json(videoData);
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
