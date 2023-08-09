import express from "express";

// Routes
import { router as authRoutes } from "./routes/auth";
import { router as productsRoutes } from './routes/products';

// DB connection utility
import { dbConnection } from "./utils/dbConnection";

// connection to db
dbConnection().then((res) => console.log(res));
// initializing express
const app = express();
// PORT
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Route middlewares
app.use('/api/user', authRoutes);
app.use('/api/products', productsRoutes);

// Setting listening port
app.listen(PORT, () => console.log("server running on port 3000!"))