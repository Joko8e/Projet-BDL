import { Navigate, Outlet } from "react-router-dom";

// Composant pour les routes privées, accessible uniquement aux utilisateurs connectés (user).
const PrivateRoute = () => {
    const user = localStorage.getItem("auth");
    return user ? <Navigate to="/login" /> : <Outlet />;
}

export default PrivateRoute;