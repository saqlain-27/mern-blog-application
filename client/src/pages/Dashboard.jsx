import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMyBlogs, deleteBlog } from "../services/blogService";
import toast from "react-hot-toast";

export default function Dashboard() {

  const navigate = useNavigate();
  const [blogs,setBlogs] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const handleLogout = () =>{
    localStorage.removeItem("token");
    navigate("/");
  }

  const loadBlogs = async (pageNumber = 1) =>{
    try {
      setLoading(true);
      const res = await fetchMyBlogs({page: pageNumber, limit: 6});
      setBlogs(res.data.blogs);
      setPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() =>{
    loadBlogs();
  }, []);

  const confirmDelete = (id) => {
    setSelectedBlogId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteBlog(selectedBlogId);
      toast.success("Blog deleted");
      setShowConfirm(false);
      setSelectedBlogId(null);
      loadBlogs();
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  if(loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-300 font-medium">Loading your blogs...</p>
        </div>
      </div>
    );

    if (error) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center pt-24">
          <div className="text-center bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-8 shadow-lg max-w-md mx-4 border border-slate-700">
            <div className="bg-red-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-red-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-cyan-50 mb-2">Oops!</h3>
            <p className="text-gray-300 mb-6">{error}</p>
            <button onClick={() => {
                setError(null);
                setLoading(true);
                loadBlogs();
              }}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-colors">
              Try Again
            </button>
          </div>
        </div>
      );
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-2 sm:px-4 lg:px-16 py-10 pt-24 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-2 leading-normal pb-1 sm:text-left">Your Blogs</h1>
          <p className="text-gray-300 sm:text-left">Manage and edit your blog posts</p>
        </div>
        <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
          
          <button onClick={() => navigate("/create")} className="px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-base bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg sm:rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
            <div className="flex items-center space-x-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Create</span>
            </div>
          </button>

          <button onClick={handleLogout} className="px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-base bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg sm:rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
            <div className="flex items-center space-x-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>


      {blogs.length === 0 ? (
        <div className="text-center bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-12 shadow-lg max-w-2xl mx-auto border border-slate-700">
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-cyan-50 mb-3">No Blogs Yet</h3>
          <p className="text-gray-300 mb-6">Start sharing your thoughts with the world!</p>
          <button onClick={() => navigate("/create")}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-colors font-medium">
            Create Your First Blog
          </button>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full px-1 sm:px-0">
          {blogs.map((blog) => (
            <div key={blog._id}
              className="group bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col border border-slate-700 hover:border-cyan-400/50 overflow-hidden h-full">
              <h2 className="text-lg font-bold text-cyan-50 group-hover:text-cyan-300 transition-colors duration-200 mb-3 line-clamp-2">
                {blog.title}
              </h2>

              <p className="flex-1 text-gray-300 text-sm leading-relaxed mb-3 overflow-y-auto max-h-96 whitespace-pre-line break-words">
                {blog.content}
              </p>

              <div className="mt-auto pt-3 border-t border-slate-600">
                <div className="flex justify-between items-center gap-2">
                  <button onClick={() => navigate(`/edit/${blog._id}`)}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-lg hover:from-cyan-500/30 hover:to-blue-500/30 transition-colors text-xs sm:text-sm font-medium border border-cyan-500/30">
                    <div className="flex items-center justify-center space-x-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      <span>Edit</span>
                    </div>
                  </button>

                  <button onClick={() => confirmDelete(blog._id)}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-300 rounded-lg hover:from-red-500/30 hover:to-rose-500/30 transition-colors text-xs sm:text-sm font-medium border border-red-500/30">
                    <div className="flex items-center justify-center space-x-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>Delete</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 sm:gap-6 mt-12 sm:mt-16">
              <button disabled={page === 1} onClick={() => loadBlogs(page - 1)}
                className="px-3 sm:px-8 py-1.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs sm:text-base font-medium shadow-lg disabled:opacity-50">
                ← Prev
              </button>
  
              <span className="text-gray-200 font-semibold bg-gradient-to-r from-slate-700 to-slate-800 px-2 sm:px-6 py-1.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-base border border-slate-600">
                Page <span className="text-cyan-400">{page}</span> of{" "}
                <span className="text-purple-400">{totalPages}</span>
              </span>
  
              <button disabled={page === totalPages} onClick={() => loadBlogs(page + 1)}
                className="px-3 sm:px-8 py-1.5 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs sm:text-base font-medium shadow-lg disabled:opacity-50">
                Next →
              </button>
          </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-slate-700">
            <div className="text-center">
              <div className="bg-red-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-red-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-cyan-50 mb-3">
                Delete Blog?
              </h2>
              <p className="text-gray-300 mb-8">
                This action cannot be undone. Are you sure you want to permanently delete this blog post?
              </p>

              <div className="flex justify-center gap-4">
                <button onClick={() => {
                    setShowConfirm(false);
                    setSelectedBlogId(null);
                  }} 
                  className="px-6 py-3 bg-slate-700 text-gray-200 rounded-lg hover:bg-slate-600 transition-colors font-medium border border-slate-600">
                  Cancel
                </button>

                <button onClick={handleDelete}
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                  Delete Permanently
                </button>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
  