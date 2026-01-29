import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: {type: String, required: true},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{
    timestamps: true
});

const blogSchema = new mongoose.Schema(
    {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [commentSchema]
    },{
        timestamps: true
    }
);

export default mongoose.model("Blog",blogSchema);