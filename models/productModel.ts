import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        default: 300
    },
    category: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
}, {
    timestamps: true
});

let Dataset = mongoose.models.product || mongoose.model("product", productSchema);
export default Dataset;