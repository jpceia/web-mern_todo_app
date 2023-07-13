import { Navigate, Outlet } from "react-router-dom";
 
const ProtectedRoute = ({
    isAllowed,
    redirectPath
}) => {
    return isAllowed ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
