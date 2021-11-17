import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        required: true,
    },
    address: {
        type: Array,
        required: true,
    },
    city: {
        type: Array,
        required: true,
    },
    date: {
        type: Array,
        required: true,
    },
    total: {
        type: Array,
        required: true,
    },
}, {
    timestamps: true
});

let Dataset = mongoose.models.order || mongoose.model("order", orderSchema);
export default Dataset;