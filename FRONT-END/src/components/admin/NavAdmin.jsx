import React from "react";
import { NavLink } from "react-router-dom";
import DASHBOARD_LINKS from "../../utils/config/LinkDashboard";

const NavAdmin = () => {
    return (
        <>
            {/* BARRE LATÉRALE (Desktop) */}
            <aside className="d-none d-lg-flex flex-column position-fixed start-0 top-0 vh-100 shadow-lg text-white"
                style={{ width: "260px", backgroundColor: "#1a1a1a", zIndex: 1060, borderRight: "1px solid #333" }}>

                {/* Logo Section */}
                <div className="p-4 text-center">
                    <h5 className="fw-bold mb-0" style={{ letterSpacing: "2px" }}>
                        BDL <span style={{ color: "#FDB927" }}>ADMIN</span>
                    </h5>
                    <div className="mx-auto mt-2" style={{ width: "40px", height: "3px", backgroundColor: "#552583" }}></div>
                </div>

                {/* Liens de navigation */}
                <nav className="nav flex-column mt-3 px-3">
                    {DASHBOARD_LINKS.map((link, index) => (
                        <NavLink
                            key={index}
                            to={link.path}
                            className={({ isActive }) =>
                                `nav-link mb-2 d-flex align-items-center rounded-3 transition-all ${isActive ? "active-admin" : "text-white-50 hover-admin"
                                }`
                            }
                            style={{ padding: "12px 15px" }}
                        >
                            <div className="icon-box me-3 d-flex align-items-center justify-content-center" style={{ width: "30px" }}>
                                <i className={`${link.icon} fs-5`}></i>
                            </div>
                            <span className="fw-medium">{link.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Footer Sidebar */}
                <div className="mt-auto p-4 border-top border-secondary">
                    <div className="d-flex align-items-center">
                        <div className="rounded-circle bg-warning me-2" style={{ width: "10px", height: "10px" }}></div>
                        <small className="text-white-50">Version 2.0.1</small>
                    </div>
                </div>
            </aside>

            {/* BARRE DE NAVIGATION (Mobile / Tablette) */}
            <nav className="d-lg-none fixed-bottom bg-dark border-top border-secondary px-2 py-1" style={{ zIndex: 1060 }}>
                <div className="d-flex justify-content-around">
                    {DASHBOARD_LINKS.slice(0, 5).map((link, index) => ( // On limite à 5 pour pas surcharger
                        <NavLink
                            key={index}
                            to={link.path}
                            className={({ isActive }) =>
                                `d-flex flex-column align-items-center text-decoration-none py-2 px-3 rounded ${isActive ? "text-warning" : "text-white-50"
                                }`
                            }
                        >
                            <i className={`${link.icon} fs-4`}></i>
                            <span style={{ fontSize: "10px" }}>{link.label}</span>
                        </NavLink>
                    ))}
                </div>
            </nav>

            <style>
                {`
                    .transition-all { transition: all 0.3s ease; }
                    
                    /* Style du lien actif */
                    .active-admin {
                        background: linear-gradient(45deg, #552583, #6d32a3) !important;
                        color: #FDB927 !important;
                        box-shadow: 0 4px 15px rgba(85, 37, 131, 0.4);
                    }

                    /* Style au survol */
                    .hover-admin:hover {
                        background-color: rgba(255, 255, 255, 0.05);
                        color: #fff !important;
                        transform: translateX(5px);
                    }

                    .nav-link i {
                        transition: transform 0.3s ease;
                    }

                    .active-admin i {
                        transform: scale(1.2);
                    }

                    /* Ajustement du contenu principal pour ne pas être caché par la barre mobile */
                    @media (max-width: 991px) {
                        body { padding-bottom: 70px; }
                    }
                `}
            </style>
        </>
    );
};

export default NavAdmin;