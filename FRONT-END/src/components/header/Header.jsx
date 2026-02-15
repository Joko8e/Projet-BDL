import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { PanierContext } from "../../utils/context/PanierContext";
import { Link } from "react-router-dom";
import HEADER_LINK from "../../utils/config/LinkHeader";

const Header = () => {

    const { user, logout } = useContext(AuthContext);
    const { totalArticle } = useContext(PanierContext);

    const isAuthenticated = user;
    const role = user?.role;


    const visibleLinks = HEADER_LINK.filter((link) => {
        if (link.auth) return true; // afiche tous les liens publics
        if (!isAuthenticated) return false; // si pas connecté, pas d'accès
        if (link.auth === role) return true; // si le rôle correspond, accès accordé
        return false; // sinon pas d'accès
    })

    return (
        <>
            {/* Ajout de sticky-top et d'un z-index élevé */}
            <header className="sticky-top shadow" style={{ backgroundColor: "#552583", borderBottom: "4px solid #FDB927", zIndex: 1050 }}>
                <nav className="navbar navbar-expand-lg navbar-dark p-2">
                    <div className="container-fluid">
                        {/* HOME : Mobile */}
                        <Link className="navbar-brand d-lg-none fw-bold" to='/' style={{ color: "#FDB927" }}>
                            HOME
                        </Link>

                        {/* BURGER */}
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown"
                            aria-controls="navbarNavDropdown"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            style={{ borderColor: "#FDB927" }}
                        >
                            <span className="navbar-toggler-icon" style={{ filter: "invert(76%) sepia(88%) saturate(373%) hue-rotate(352%) brightness(102%) contrast(98%)" }}></span>
                        </button>

                        {/* LOGO CENTRAL (Desktop) */}
                        <Link
                            to="/"
                            className="d-none d-lg-block"
                            style={{
                                position: "absolute",
                                left: "50%",
                                transform: "translateX(-50%)",
                                top: "5px",
                                zIndex: 1100,
                            }}
                        >
                            <img
                                src="/logo.png"
                                alt="Logo BDL"
                                style={{
                                    height: "110px", // Légèrement réduit pour le mode sticky
                                    width: "110px",
                                    borderRadius: "50%",
                                    border: "3px solid #FDB927",
                                    backgroundColor: "#552583",
                                    boxShadow: "0px 4px 15px rgba(0,0,0,0.5)",
                                    objectFit: "cover"
                                }}
                            />
                        </Link>

                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav w-100 align-items-center">
                                <li className="nav-item d-none d-lg-block">
                                    <Link className="nav-link fw-bold" to='/' style={{ color: "#FDB927" }}>HOME</Link>
                                </li>

                                {visibleLinks.map((link, index) => (
                                    <li className="nav-item" key={index}>
                                        <Link className="nav-link" to={link.path} style={{ color: "#FDB927" }}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}

                                {/* Espace central pour le logo */}
                                <li className="nav-item mx-lg-5 d-none d-lg-block" style={{ width: "100px" }}></li>

                                <li className="nav-item">
                                    <Link className="nav-link" to='/article' style={{ color: "#FDB927" }}>Article</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/panier' style={{ color: "#FDB927" }}>
                                        Panier <span className="badge rounded-pill bg-warning text-dark">{totalArticle()}</span>
                                    </Link>
                                </li>

                                <li className="nav-item ms-lg-auto mt-3 mt-lg-0">
                                    {isAuthenticated ? (
                                        <button onClick={logout} className="btn btn-sm btn-outline-light">Déconnexion</button>
                                    ) : (
                                        <Link to='sign' className="btn btn-sm btn-warning fw-bold" style={{ color: "#552583" }}>
                                            CONNEXION
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            {/* SECTION BANNIÈRE - Full Width */}
            <div className="container-fluid p-0 w-100 overflow-hidden shadow-lg">
                <div style={{ width: '100%', height: '450px' }}>
                    <img
                        src="https://t3.ftcdn.net/jpg/09/21/35/46/360_F_921354600_n92VNygty62fvZB2DCYZ3rNvgKM1Hfux.jpg"
                        alt="BannerBASKET"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            </div>
        </>
    );
}

export default Header