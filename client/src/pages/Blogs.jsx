import { useEffect, useState } from "react";
import { fetchBlogs } from "../services/blogService";

export default function Blogs(){
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() =>{
        const loadBlogs = async () => {
            try {
                const res = await fetchBlogs();
                setBlogs(res.data);
            } catch (error) {
                console.error(error);
                setError("Failed to load blogs. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        loadBlogs();
    },[]);

    if (loading) {
        return (
          <div className="min-h-screen flex items-center justify-center text-gray-500">
            Loading blogs...
          </div>
        );
      }

      if (error) {
        return (
          <div className="min-h-screen flex items-center justify-center text-red-500">
            {error}
          </div>
        );
      }

      if (!blogs.length) {
        return (
          <div className="min-h-screen flex items-center justify-center text-gray-500">
            No blogs available.
          </div>
        );
      }

      return(
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-16 py-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
            Latest Blogs </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.map(blog =>(
                    
                    <div key={blog._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 flex flex-col"> 
                        
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            {blog.title}
                        </h2>
                        
                        <p className="text-gray-600 text-sm flex-grow line-clamp-4">
                            {blog.content}
                        </p>
                        
                        <div className="mt-4 text-xs text-gray-400">
                            By {blog.author?.email}
                        </div>
                    
                    </div>
                ))}
            </div>

        </div>
      );
}