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
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center pt-24">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading blogs...</p>
            </div>
          </div>
        );
      }

      if (error) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center pt-24">
            <div className="text-center bg-white rounded-xl p-8 shadow-lg max-w-md mx-4">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops!</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        );
      }

      if (!blogs.length) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center pt-24">
            <div className="text-center bg-white rounded-xl p-8 shadow-lg max-w-md mx-4">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Blogs Found</h3>
              <p className="text-gray-600">Be the first to share your thoughts with the world!</p>
            </div>
          </div>
        );
      }

      return(
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-10 pt-24">
            <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-3 leading-[2] pb-4 pt-2">
                    Latest Blogs
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.map(blog =>(
                    
                    <div key={blog._id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 flex flex-col border border-gray-100 hover:border-indigo-100"> 
                        
                        <h2 className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors line-clamp-2 mb-4">
                            {blog.title}
                        </h2>
                        
                        <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-4">
                            {blog.content}
                        </p>
                        
                        <div className="mt-auto pt-4 border-t border-gray-100">
                            <div className="flex items-center space-x-2">
                                <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-xs text-gray-500 font-medium">
                                    {blog.author?.email}
                                </span>
                            </div>
                        </div>
                    
                    </div>
                ))}
            </div>

        </div>
      );
}