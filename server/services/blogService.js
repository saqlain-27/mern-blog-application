import Blog from "../models/Blog.js";

export async function createBlog({ title, content, userId }) {
    const blog = await Blog.create({
        title,
        content,
        author: userId
    });
    return blog;
}

export async function getAllBlogs({ page = 1, limit = 6 }) {
    const skip = (page - 1) * limit;
    const [blogs , total] = await Promise.all([
        Blog.find()
        .populate({path: "author", select: "username"})
        .populate({path: "comments.author", select: "username"})
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit),

        Blog.countDocuments()
    ]);
    
    return { blogs,
        totalPages: Math.ceil(total / limit),
        currentPage: page
     };
}

export async function getMyBlogs({userId, page=1, limit=6}) {
    const skip = (page - 1) * limit;
    const [blogs, total] = await Promise.all([
        Blog.find({author: userId})
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit),

        Blog.countDocuments({author: userId})
    ]);

    return  {
        blogs,
        totalPages: Math.ceil(total/limit),
        currentPage: page
    };
}

export async function getBlogById({ blogId, userId }) {
    return Blog.findOne({ _id: blogId, author: userId });
  }

export async function toggleLike({blogId,userId}){
    const blog = await Blog.findById(blogId);
    if(!blog)
        return null;

    const alreadyLiked = blog.likes.includes(userId);

    if(alreadyLiked)
        blog.likes.pull(userId);
    else
        blog.likes.push(userId);

    await blog.save();
    return blog;
}

export async function addComment({blogId, userId, text}) {
    const blog = await Blog.findById(blogId);
    if(!blog)
        return null;
    blog.comments.push({
        text,
        author: userId
    });

    await blog.save();

    const populatedBlog = await Blog.findById(blogId)
        .populate({path: "comments.author", select: "username"});

    return populatedBlog.comments.at(-1);
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