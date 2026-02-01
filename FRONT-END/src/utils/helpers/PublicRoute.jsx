import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const user = localStorage.getItem("auth");
    return (
        // Si l'utilisateur est authentifié, rendre les composants enfants, sinon rediriger vers la page d'accueil
        user ? <Outlet /> :  <Navigate to="/" />
    )
}

export default PublicRoute;