import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { Link } from "react-router-dom";
import HEADER_LINK from "../../utils/config/LinkHeader";

const Header = () => {

    const { user, logout } = useContext(AuthContext);
console.log("tt",user);

    const isAuthenticated = user;
    const role = user?.role;
    console.log("is auth", isAuthenticated);
    

    const visibleLinks = HEADER_LINK.filter((link) => {
        if (link.auth) return true; // afiche tous les liens publics
        if (!isAuthenticated) return false; // si pas connecté, pas d'accès
        if(link.auth === role) return true; // si le rôle correspond, accès accordé
        return false; // sinon pas d'accès
    })

    return (
        <header className="container-fluid" style={{backgroundColor:"#552583"}}>
            <nav className="navbar navbar-expand-lg navbar-light p-2">
                <div className="container-fluid">
                    <Link to='/'>Home</Link> 
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mx-auto">
                        {visibleLinks.map((link, index) => (
                            <li className="nav-item" key={index}>
                                <Link className="nav-link" to={link.path}>
                                    {link.label}
                                </Link>
                            </li>
                        ))} 
                    </ul>

                    {/* bouton de connexion / deconnexion */}
                    <ul className="navbar-nav ms-auto">
                        {isAuthenticated ? (
                            <li className="nav-item">
                                <button onClick={logout} className="btn btn-outline-danger">Déconnexion</button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                    <Link to='sign' className="btn btn-outline-primary">
                                        Connexion
                                    </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header