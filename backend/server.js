import path from "path";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import products from "./data/products.js";
import cors from "cors";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import uploadRoute from "./routes/uploadRoutes.js";

dotenv.config();
const app = express();

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use(express.json());

connectDB();
app.use(cors());

// Routes

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRoute);

app.get("/api/config/paypal", (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);

// app.use("/uploads", express.static());

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/build")));
	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
	);
} else {
	app.get("/", (req, res) => {
		res.send("API is running......");
	});
}

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
