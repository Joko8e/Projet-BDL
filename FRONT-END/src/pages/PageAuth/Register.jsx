import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utils/context/AuthContext";
import { REGISTER_FIELDS } from "../../utils/config/FormFiedls.js";

const Register = () => {
    const { register } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Petite validation élégante
        const required = ["nom", "prenom", "email", "password", "adresse", "ville", "code_postal"];
        const isMissing = required.some(field => !user[field]);

        if (isMissing) {
            alert("Veuillez remplir tous les champs obligatoires pour rejoindre l'équipe.");
            return;
        }

        setIsLoading(true);
        try {
            await register(user);
        } catch (error) {
            console.error("Erreur :", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
            <style>
                {`
                    .register-card {
                        border-radius: 30px;
                        border: none;
                        max-width: 700px;
                    }
                    .input-group-text {
                        background-color: transparent;
                        border-right: none;
                        color: #552583;
                    }
                    .form-control {
                        border-left: none;
                        font-size: 0.9rem;
                        padding: 10px;
                    }
                    .form-control:focus {
                        box-shadow: none;
                        border-color: #dee2e6;
                    }
                    .btn-register {
                        background-color: #552583;
                        color: white;
                        border-radius: 15px;
                        padding: 12px;
                        font-weight: bold;
                        transition: all 0.3s ease;
                    }
                    .btn-register:hover {
                        background-color: #2a1242;
                        color: #FDB927;
                        transform: translateY(-2px);
                    }
                `}
            </style>

            <div className="col-12 col-md-10 col-lg-8 px-4">
                <div className="card register-card shadow-lg p-4 p-md-5 mx-auto">

                    {/* EN-TÊTE */}
                    <div className="text-center mb-5">
                        <h2 className="fw-black mb-1" style={{ color: "#552583", letterSpacing: "-1px" }}>REJOINDRE LE CLUB</h2>
                        <div className="mx-auto" style={{ height: "4px", width: "30px", backgroundColor: "#FDB927" }}></div>
                        <p className="text-muted mt-3">Créez votre compte pour un accès exclusif à nos collections.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            {REGISTER_FIELDS.map((field, index) => {
                                // On définit les champs qui vont par deux sur une ligne pour aérer
                                const isHalfWidth = ["nom", "prenom", "ville", "code_postal"].includes(field.name);

                                return (
                                    <div className={isHalfWidth ? "col-md-6" : "col-12"} key={index}>
                                        <label htmlFor={field.id} className="form-label small fw-bold text-uppercase text-muted px-1">
                                            {field.name}
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className={field.icon}></i>
                                            </span>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                id={field.id}
                                                placeholder={field.placeholder}
                                                className="form-control bg-light"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="d-grid mt-5">
                            <button type="submit" className="btn btn-register btn-lg shadow" disabled={isLoading}>
                                {isLoading ? (
                                    <span className="spinner-border spinner-border-sm" role="status"></span>
                                ) : (
                                    "CRÉER MON COMPTE"
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-4">
                        <p className="mb-0 text-muted small">
                            Déjà membre de l'équipe ?{" "}
                            <Link to="/sign" className="text-decoration-none fw-bold" style={{ color: "#552583" }}>
                                Connectez-vous
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="text-center mt-4 mb-5">
                    <Link to="/" className="text-decoration-none text-muted small">
                        <i className="bi bi-house-door me-1"></i> Retour à la boutique
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;