import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, getMyBlogs } from "../services/blogService.js";

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
        const blogs = await getAllBlogs();
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
