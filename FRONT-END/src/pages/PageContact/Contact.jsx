import React from "react";

const Contact = () => {
    return (
        <div className="container py-5 d-flex align-items-center justify-content-center" style={{ minHeight: "70vh" }}>
            <div className="row justify-content-center w-100">
                <div className="col-12 col-md-8 col-lg-6">

                    {/* CARTE DE CONTACT CENTRÉE */}
                    <div className="card border-0 p-4 p-md-5 text-white shadow-lg text-center"
                        style={{
                            backgroundColor: "#552583",
                            borderRadius: "20px",
                            borderBottom: "8px solid #FDB927" // Rappel de la bordure Or
                        }}>

                        <h1 className="fw-bold mb-4" style={{ color: "#FDB927" }}>CONTACTEZ-NOUS</h1>

                        <p className="mb-5 opacity-75">
                            Une question sur un produit ou sur votre commande ? <br />
                            Notre équipe de fans est là pour vous répondre dans les plus brefs délais.
                        </p>

                        {/* SECTION EMAIL */}
                        <div className="mb-5">
                            <div className="bg-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 shadow"
                                style={{ width: "70px", height: "70px" }}>
                                <i className="fas fa-envelope fa-2x" style={{ color: "#552583" }}></i>
                            </div>
                            <h5 className="mb-2" style={{ color: "#FDB927", letterSpacing: "1px" }}>EMAIL OFFICIEL</h5>
                            <a href="mailto:jordymavuid@gmail.com"
                                className="h4 text-white text-decoration-none fw-bold"
                                style={{ wordBreak: "break-word" }}>
                                jordymavuidi@gmail.com
                            </a>
                        </div>

                        {/* SECTION RÉSEAUX SOCIAUX */}
                        <div className="pt-4" style={{ borderTop: "1px solid rgba(253, 185, 39, 0.2)" }}>
                            <h6 className="mb-3" style={{ color: "#FDB927" }}>SUIVEZ LE SHOWTIME</h6>
                            <div className="d-flex justify-content-center gap-4">
                                <a href="#" className="text-white social-link"><i className="fab fa-instagram fa-2x"></i></a>
                                <a href="#" className="text-white social-link"><i className="fab fa-facebook fa-2x"></i></a>
                                <a href="#" className="text-white social-link"><i className="fab fa-x-twitter fa-2x"></i></a>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Un petit style pour l'effet de survol des réseaux sociaux */}
            <style>
                {`
                    .social-link { transition: all 0.3s ease; }
                    .social-link:hover { color: #FDB927 !important; transform: scale(1.2); }
                `}
            </style>
        </div>
    );
};

export default Contact;