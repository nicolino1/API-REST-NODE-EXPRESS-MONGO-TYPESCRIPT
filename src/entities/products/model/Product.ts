import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    prdId: {
        type: String,
        required: true,
        max: 255
    },
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    description: {
        type: String,
        required: true,
        min: 25,
        max: 1024
    },
    imageUrl: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    brand: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    category: {
        type: Array<String>,
        required: true,
    },
    stock: {
        type: Number,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    }
});

export default mongoose.model("Product", productSchema);
