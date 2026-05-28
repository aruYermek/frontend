import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRole: "participant" | "organizer";
};

const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== allowedRole) {
    if (user.role === "participant") {
      return <Navigate to="/user/dashboard" replace />;
    }

    if (user.role === "organizer") {
      return <Navigate to="/organizer/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;