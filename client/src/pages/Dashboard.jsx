import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMyBlogs, deleteBlog } from "../services/blogService";
import toast from "react-hot-toast";

export default function Dashboard() {

  const navigate = useNavigate();
  const [blogs,setBlogs] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const handleLogout = () =>{
    localStorage.removeItem("token");
    navigate("/");
  }

  const loadBlogs = async () =>{
    try {
      const res = await fetchMyBlogs();
      setBlogs(res.data); 
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
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading your blogs...
      </div>
    );

    if (error) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <p className="text-red-500">{error}</p>
          <button onClick={() => {
              setError(null);
              setLoading(true);
              loadBlogs();
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
            Retry
          </button>
        </div>
      );
    }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-16 py-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Your Blogs</h1>
        <div className="flex gap-3">
          
          <button onClick={() => navigate("/create")} className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Create Blog
          </button>

          <button onClick={handleLogout} className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </div>


      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t written any blogs yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog._id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {blog.title}
              </h2>

              <p className="flex-1 text-gray-600 text-sm line-clamp-4">
                {blog.content}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => navigate(`/edit/${blog._id}`)}
                  className="text-indigo-600 hover:underline text-sm">
                  Edit
                </button>

                <button onClick={() => confirmDelete(blog._id)}
                  className="text-red-500 hover:underline text-sm">
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Delete Blog?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button onClick={() => {
                    setShowConfirm(false);
                    setSelectedBlogId(null);
                  }} className="px-4 py-2 text-gray-600 hover:underline">
                Cancel
              </button>

              <button onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
  