import express from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";

const router = express.Router();

router.post("/register", async (req, res) => {
	const { username, password, firstName, lastName, address, role } = req.body;
	const user = await UserModel.findOne({ username });

	if (user) {
		return res.status(400).json({ message: "User already exists " });
	}

	const newUser = new UserModel({ username, password, firstName, lastName, address, role });
	await newUser.save();
	res.json({ message: "User registered successfully" });
});

router.post("/", async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await UserModel.findOne({ username });
		if (!user) {
			return res.status(400).json({ message: "incorrect username or password" });
		}

		if (password !== user.password) {
			return res.status(400).json({ message: "incorect username or password" });
		}
		const token = jwt.sign({ id: user._id, role: user.role }, "secret");
		res.json({ token, userID: user._id, role: user.role });
	} catch (error) {
		console.error("Error logging in:", error);
		res.status(500).json({ success: false, error: "Failed to login" });
	}
});

router.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to the API" });
});

export { router as authRouter };
