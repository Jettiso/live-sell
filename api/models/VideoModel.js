import mongoose from "mongoose";



const videosDBconnection = mongoose.createConnection("mongodb://127.0.0.1:27017/videos", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

videoDBconnection.on('connected', () => {
    console.log('connected to videosDB');
})

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    
})