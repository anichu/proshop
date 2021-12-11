import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import products from "./data/products.js";
import cors from "cors";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
dotenv.config();
const app = express();

app.use(express.json());

connectDB();
app.use(cors());

// Routes

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// console.log(process.env.PORT);

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} on Port ${PORT}🔥🔥🔥`.yellow
			.bold
	)
);
