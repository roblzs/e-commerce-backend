import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps: true
});

let Dataset = mongoose.models.category || mongoose.model("category", categorySchema);
export default Dataset;