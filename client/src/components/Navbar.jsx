import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () =>{
        localStorage.removeItem("token");
        navigate("/");
    };

    return(
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/30 shadow-md shadow-gray-300/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex min-h-16 items-center justify-between flex-wrap">
                    <Link to="/blogs" className="flex items-center space-x-3 group">
                        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-10 h-10 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:to-pink-700 transition-all duration-300">
                            BlogHub
                        </span>
                    </Link>

                    <div className="flex items-center gap-2 sm:gap-7 flex-wrap justify-center sm:justify-end w-full sm:w-auto">
                        <Link to="/blogs"  className="px-2.5 py-2.5 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold text-gray-700 hover:text-gray-900 hover:bg-white/60 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-sm">
                            Blogs
                        </Link>

                        {token && (
                            <>
                                <Link to="/dashboard" className="px-3 py-2.5 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold text-gray-700 hover:text-gray-900 hover:bg-white/60 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-sm">
                                    Dashboard
                                </Link>

                                <Link to="/create" className="px-3 py-2.5 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold text-gray-700 hover:text-gray-900 hover:bg-white/60 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-sm">
                                    Write
                                </Link>

                                <button  onClick={handleLogout} 
                                    className="px-3.5 py-2.5 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 hover:bg-red-100/80 transition-all duration-300 border border-red-500/60 hover:border-red-600/80 transform hover:-translate-y-0.5 hover:shadow-sm">
                                    Logout
                                </button>
                            </>
                        )}

                        {!token && (
                            <Link to="/" className="ml-8 sm:ml-0 px-5 py-2.5 rounded-xl text-sm font-bold
                                    bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700
                                    transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105">
                                Login
                            </Link>
                        )}                        
                    </div>
                </div>
            </div>
        </nav>
    )


}