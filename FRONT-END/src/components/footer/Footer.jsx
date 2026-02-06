import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    // Année dynamique pour le copyright
    const currentYear = new Date().getFullYear();

    return (
        <footer className="container-fluid py-4" style={{ backgroundColor: "#552583", borderTop: "3px solid #FDB927" }}>
            <div className="row">
                <div className="col-12 text-center">

                    {/* --- RÉSEAUX SOCIAUX --- */}
                    <div className="mb-3">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="mx-3 d-inline-block">
                            <i className="fab fa-facebook-f fa-lg" style={{ color: "#FDB927" }}></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="mx-3 d-inline-block">
                            <i className="fab fa-instagram fa-lg" style={{ color: "#FDB927" }}></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="mx-3 d-inline-block">
                            <i className="fab fa-x-twitter fa-lg" style={{ color: "#FDB927" }}></i>
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="mx-3 d-inline-block">
                            <i className="fab fa-youtube fa-lg" style={{ color: "#FDB927" }}></i>
                        </a>
                    </div>

                    {/* Ligne de séparation subtile */}
                    <hr className="mx-auto" style={{ width: "60%", borderTop: "1px solid #FDB927", opacity: 0.3 }} />

                    {/* --- LIENS LÉGAUX --- */}
                    <div className="d-flex justify-content-center flex-wrap mt-3">
                        <Link to='cgv' className="mx-3 py-2 text-decoration-none" style={{ color: "#FDB927", fontWeight: "500" }}>
                            CGV
                        </Link>
                        <Link to='mentionLeg' className="mx-3 py-2 text-decoration-none" style={{ color: "#FDB927", fontWeight: "500" }}>
                            Mentions Légales
                        </Link>
                        <Link to='contact' className="mx-3 py-2 text-decoration-none" style={{ color: "#FDB927", fontWeight: "500" }}>
                            Contact
                        </Link>
                    </div>

                    {/* --- COPYRIGHT --- */}
                    <div className="mt-4" style={{ color: "#FDB927", fontSize: "0.8rem", opacity: 0.7 }}>
                        <p>© {currentYear} Ball Don't Lie. All Rights Reserved.</p>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;