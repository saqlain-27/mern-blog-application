import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () =>{
        localStorage.removeItem("token");
        navigate("/");
    };

    return(
        <nav className="bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/blogs" className="text-xl font-bold text-indigo-600">
                    BlogHub</Link>

                    <div className="flex items-center gap-4 text-sm font-medium">
                        
                        <Link to="/blogs" className="text-gray-700 hover:text-indigo-600">
                        Blogs</Link>

                        {token && (
                            <>
                                <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">
                                Dashboard</Link>

                                <Link to="/create"
                                className="text-gray-700 hover:text-indigo-600">
                                Write</Link>

                                <button onClick={handleLogout} className="text-red-500 hover:text-red-600">
                                    Logout
                                </button>
                            </>
                        )}

                        {!token && (
                            <Link to="/" className="text-indigo-600 hover:underline">Login</Link>
                        )}                        

                    </div>
                </div>
            </div>
        </nav>
    )


}