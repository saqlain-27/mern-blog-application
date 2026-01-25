import Blog from "../models/Blog.js";

export async function createBlog({ title, content, userId }) {
    const blog = await Blog.create({
        title,
        content,
        author: userId
    });
    return blog;
}

export async function getAllBlogs() {
    return Blog.find()
    .populate("author","email")
    .sort({createdAt: -1});    
}

export async function getMyBlogs(userId) {
    return Blog.find({author: userId}).sort({createdAt: -1});
}

export async function getBlogById({ blogId, userId }) {
    return Blog.findOne({ _id: blogId, author: userId });
  }

export async function updateBlog({ blogId, title, content, userId }) {
    const blog = await Blog.findOneAndUpdate(
        { _id: blogId, author: userId },
        { $set: {title, content }},
        { new:true, runValidators: true }
    );
    return blog;
}

export async function deleteBlog({blogId, userId}) {
    return Blog.findOneAndDelete({_id: blogId, author: userId});    
}