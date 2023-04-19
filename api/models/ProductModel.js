import mongoose from "mongoose";

const productDBConnection = mongoose.createConnection("mongodb://127.0.0.1:27017/products", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

productDBConnection.on("connected", () => {
	console.log("Connected to productDB");
});

productDBConnection.on("error", (err) => {
	console.error("Error connecting to the DB", err);
});

const productSchema = new mongoose.Schema({
	productName: {
		type: String,
		required: true,
	},
	productPrice: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // Add ref field to reference User model
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export const ProductModel = productDBConnection.model("product", productSchema);
