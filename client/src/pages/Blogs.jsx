import { useEffect, useState } from "react";
import { fetchBlogs, toggleLike, addComment } from "../services/blogService";

export default function Blogs(){
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [expandedComments, setExpandedComments] = useState({});

    const loadBlogs = async (pageNumber = 1) => {
      try {
          setLoading(true);
          const res = await fetchBlogs({page: pageNumber, limit: 6});
          setBlogs(res.data.blogs);
          setPage(res.data.currentPage);
          setTotalPages(res.data.totalPages);
      } catch (error) {
          console.error(error);
          setError("Failed to load blogs. Please try again.");
      } finally {
          setLoading(false);
      }
  };
    
    const handleLike = async (blogId) => {
        try {
            const response = await toggleLike(blogId);
            // Update the blog with the new like count
            setBlogs(prevBlogs => 
                prevBlogs.map(blog => 
                    blog._id === blogId 
                        ? { ...blog, likes: response.data.likes }
                        : blog
                )
            );
        } catch (error) {
            console.error('Error liking blog:', error);
        }
    };

    const toggleComments = (blogId) => {
        setExpandedComments(prev => ({
            ...prev,
            [blogId]: !prev[blogId]
        }));
    };

    const handlePostComment = async (blogId, commentText) => {
        if (!commentText.trim()) return;
        
        try {
            const response = await addComment(blogId, commentText);
            // Add the new comment to the blog
            setBlogs(prevBlogs => 
                prevBlogs.map(blog => 
                    blog._id === blogId 
                        ? { 
                            ...blog, 
                            comments: [...(blog.comments || []), response.data]
                        } 
                        : blog
                )
            );
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    useEffect(() =>{
        loadBlogs(1);
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
              <button onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-2 sm:px-4 py-10 pt-24 overflow-x-hidden">
            <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-3 leading-[2] pb-4 pt-2 drop-shadow-lg">
                    Latest Blogs
                </h1>
                <p className="text-gray-300 text-lg mb-6">Discover amazing stories and insights</p>
                <div className="w-32 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 mx-auto rounded-full shadow-lg"></div>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full px-1 sm:px-0">
                {blogs.map(blog =>(
                    
                    <div key={blog._id} className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col border border-slate-700 hover:border-cyan-400/50 overflow-hidden h-full">
                        {/* Background gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                        
                        <div className="relative z-10 flex flex-col h-full">
                            <h2 className="text-lg font-bold text-cyan-50 group-hover:text-cyan-300 transition-colors duration-200 line-clamp-2 mb-3">
                                {blog.title}
                            </h2>
                            
                            <p className="text-gray-300 text-sm leading-relaxed flex-grow mb-3 overflow-y-auto max-h-96 whitespace-pre-line break-words">
                                {blog.content}
                            </p>
                            
                            {/* Likes and Comments Section */}
                            <div className="flex items-center justify-between mb-3 pt-2 flex-wrap gap-2">
                                <div className="flex items-center space-x-1.5">
                                    {/* Like Button */}
                                    <button onClick={() => handleLike(blog._id)}
                                        className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs sm:text-sm bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-300 hover:from-red-500/30 hover:to-rose-500/30 transition-colors duration-200 border border-red-500/30">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                        </svg>
                                        <span className="font-semibold">{typeof blog.likes === 'number' ? blog.likes : (blog.likes?.length || 0)}</span>
                                    </button>
                                    
                                    {/* Comment Button */}
                                    <button onClick={() => toggleComments(blog._id)}
                                        className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs sm:text-sm bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 hover:from-blue-500/30 hover:to-cyan-500/30 transition-colors duration-200 border border-blue-500/30">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                                        </svg>
                                        <span className="font-semibold">{blog.comments?.length || 0}</span>
                                    </button>
                                </div>
                                
                                <span className="text-xs text-gray-400 px-3 py-1.5 bg-slate-900/50 rounded-full">
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            
                            {/* Comments Section */}
                            {expandedComments[blog._id] && (
                                <div className="mb-4 border-t border-slate-600 pt-4">
                                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2 mb-3">
                                        {blog.comments && blog.comments.length > 0 ? (
                                            blog.comments.map((comment, index) => (
                                                <div key={index} className="text-sm bg-slate-900/30 p-3 rounded-lg border border-slate-600/50">
                                                    <span className="font-medium text-cyan-300">
                                                        {comment.author?.username || 'Anonymous'}
                                                    </span>
                                                    <p className="text-gray-300 mt-1">
                                                        {comment.text}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-400 italic text-center py-2">
                                                No comments yet. Be the first!
                                            </p>
                                        )}
                                    </div>
                                    
                                    {/* Add Comment Form */}
                                    <div className="pt-3 border-t border-slate-600">
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            const input = e.target.comment;
                                            handlePostComment(blog._id, input.value);
                                            input.value = '';
                                        }} className="flex space-x-2">
                                            <input name="comment" type="text" placeholder="Share your thoughts..." 
                                                className="flex-1 px-3 py-2 text-sm bg-slate-900/50 border border-slate-600 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none transition-all"/>
                                            <button type="submit"
                                                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg">
                                                Post
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                            
                            <div className="pt-3 border-t border-slate-600">
                                <div className="flex items-center space-x-2">
                                    <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full w-8 h-8 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-xs text-gray-400 font-medium truncate">
                                        {blog.author?.username}
                                    </span>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                ))}
            </div>
            
            <div className="flex justify-center items-center gap-3 sm:gap-6 mt-12 sm:mt-16">
              <button disabled={page === 1} onClick={() => loadBlogs(page - 1)} className="px-3 sm:px-8 py-1.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs sm:text-base sm:font-semibold font-medium shadow-lg hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl border border-cyan-400/30">
                ← Prev
              </button>

              <span className="text-gray-200 font-semibold bg-gradient-to-r from-slate-700 to-slate-800 px-2 sm:px-6 py-1.5 sm:py-3 rounded-lg sm:rounded-xl shadow-md text-xs sm:text-base border border-slate-600">
                Page <span className="text-cyan-400">{page}</span> of <span className="text-purple-400">{totalPages}</span>
              </span>

              <button disabled={page === totalPages} onClick={() => loadBlogs(page + 1)} className="px-3 sm:px-8 py-1.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs sm:text-base sm:font-semibold font-medium shadow-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl border border-purple-400/30">
                Next →
              </button>
            </div>
        </div>
      );
}