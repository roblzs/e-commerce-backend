import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

let Dataset = mongoose.models.user || mongoose.model("category", categorySchema);
export default Dataset;