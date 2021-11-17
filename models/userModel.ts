import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    cart: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

let Dataset = mongoose.models.user || mongoose.model("user", userSchema);
export default Dataset;