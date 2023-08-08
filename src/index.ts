import express from "express";
import { router as authRoutes } from "./routes/auth";
import { router as productsRoutes } from './routes/products';
import { dbConnection } from "./utils/dbConnection";

// create application/x-www-form-urlencoded parser
// const urlencodedParser = bodyParser.urlencoded({ extended: false })

// connection to db
dbConnection().then((res) => console.log(res));

const app = express();
// PORT
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Route middlewares

app.use('/api/user', authRoutes);
app.use('/api/products', productsRoutes);



app.listen(PORT, () => console.log("server running on port 3000!"))