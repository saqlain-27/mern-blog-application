import { createBlog, getAllBlogs, getBlogById, toggleLike, addComment, updateBlog, deleteBlog, getMyBlogs } from "../services/blogService.js";

export const create = async (req,res) => {
    try {
        const blog = await createBlog({
            title: req.body.title,
            content: req.body.content,
            userId: req.user.userId
        });
        res.status(201).json(blog);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
    
        const blogs = await getAllBlogs({page, limit});
        res.json(blogs);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMine = async (req, res) => {
    try {
        const blogs = await getMyBlogs(req.user.userId);
        res.json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const getOne = async (req, res) => {
    try {
      const blog = await getBlogById({
        blogId: req.params.id,
        userId: req.user.userId,
      });
  
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      res.json(blog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

export const like = async (req,res) =>{
    try {
        const blog = await toggleLike({
            blogId: req.params.id,
            userId: req.user.userId
        });

        if(!blog)
            res.status(404).json({message: "Blog not found"});

        res.json({likes: blog.likes.length});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const comment = async (req,res) =>{
    try {
        const { text } = req.body;
        if(!text || !text.trim())
            return res.status(400).json({message: "Commment cannot be empty"});

        const newComment = await addComment({
            blogId: req.params.id,
            userId: req.user.userId,
            text
        });

        if(!newComment)
            return res.status(400).json({message: "Blog not found"});

        res.status(201).json(newComment);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const update =  async (req,res) => {
    try {
        const blog = await updateBlog({
            blogId: req.params.id,
            title: req.body.title,
            content: req.body.content,
            userId: req.user.userId
        });

        if (!blog)
            return res.status(403).json({ message: "Not allowed" });

        res.json(blog);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const remove = async (req,res) => {
    try {
        const blog = await deleteBlog({
            blogId: req.params.id,
            userId: req.user.userId
        });

        if (!blog)
            return res.status(403).json({ message: "Not allowed" });

        res.json({ message: "Blog deleted" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
