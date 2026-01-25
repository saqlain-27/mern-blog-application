import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    },{
        timestamps: true
    }
);

export default mongoose.model("Blog",blogSchema);