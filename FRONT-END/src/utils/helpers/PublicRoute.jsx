import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const user = localStorage.getItem("auth");
    return (
        // Si l'utilisateur n'est pas authentifié, rendre les composants enfants, sinon rediriger vers la page d'accueil
        !user ? <Navigate to="/" /> : <Outlet />
    )
}

export default PublicRoute;