import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Provider/authProvider";
import LoadingSpinner from "../Components/loadingSpinner";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        // Redirect to signin page with return url
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    // Check role-based access if roles are specified
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // Redirect to unauthorized page or home
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default PrivateRoute;
