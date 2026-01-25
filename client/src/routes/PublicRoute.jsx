import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) 
    return <Navigate to="/dashboard" replace />;

  return children;
}

//this is for direct traversal to dashboard on re-open of browser without logout (no need of link changing manually)