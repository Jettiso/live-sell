import express from "express";
import cors from "cors";
import { authRouter } from "../api/route/authRoute.js";
import { userRouter } from "../api/route/userRoute.js";

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/", authRouter);
app.use("/", userRouter);



app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
