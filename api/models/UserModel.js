import mongoose from "mongoose";

const userDBConnection = mongoose.createConnection("mongodb://127.0.0.1:27017/users", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

userDBConnection.on('connected', () => {
    console.log('Connected to userDB')
})

// Define the user schema
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
    
	
});

// Create and export the user model
export const UserModel = userDBConnection.model("user", userSchema);
