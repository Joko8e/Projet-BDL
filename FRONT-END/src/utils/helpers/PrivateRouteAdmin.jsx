import { Navigate, Outlet } from "react-router-dom";

// Composant de route privée pour les administrateurs
const PrivateRouteAdmin = () => {

    // Récupérer les informations d'authentification depuis le stockage local
    const user = JSON.parse(localStorage.getItem("auth") || "{}");
    const isAdmin = user.role === "admin";
    
    return (
        // Si l'utilisateur est un administrateur, rendre les composants enfants, sinon rediriger vers la page d'accueil
        isAdmin ? <Outlet /> : <Navigate to="/" />
    )
}

export default PrivateRouteAdmin;