import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }){
    const token = localStorage.getItem("token");

    if(!token)
        return <Navigate to="/" replace />;

    return children;
}

// on login/re-fresh/re-open of browser without logout(by changing link n not direct) it checks for existance of token only to render dashboard else redirect to "/" login
//use <Navigate /> for decisions in parent children return