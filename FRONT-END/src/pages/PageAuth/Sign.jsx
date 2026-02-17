import React, { useState, useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { Link } from "react-router-dom";

const Sign = () => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((user) => ({ ...user, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await login(formData);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
            {/* Style interne pour affiner les détails */}
            <style>
                {`
                    .login-card {
                        border-radius: 30px;
                        border: none;
                    }
                    .input-group-text {
                        background-color: transparent;
                        border-right: none;
                        color: #552583;
                    }
                    .form-control {
                        border-left: none;
                        font-size: 0.95rem;
                    }
                    .form-control:focus {
                        box-shadow: none;
                        border-color: #dee2e6;
                    }
                    .btn-login {
                        background-color: #552583;
                        color: white;
                        border-radius: 15px;
                        padding: 12px;
                        font-weight: bold;
                        transition: all 0.3s ease;
                    }
                    .btn-login:hover {
                        background-color: #2a1242;
                        color: #FDB927;
                        transform: translateY(-2px);
                    }
                `}
            </style>

            <div className="col-12 col-sm-8 col-md-6 col-lg-4 p-4">
                <div className="card login-card shadow-lg p-4 p-md-5">
                    
                    {/* EN-TÊTE LOGO */}
                    <div className="text-center mb-5">
                        <h2 className="fw-black mb-1" style={{ color: "#552583", letterSpacing: "-1px" }}>BALL DON'T LIE</h2>
                        <div className="mx-auto" style={{ height: "4px", width: "30px", backgroundColor: "#FDB927" }}></div>
                        <p className="text-muted mt-3 fw-medium">Connectez-vous pour accéder à votre terrain.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Champ Email avec icône */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label small fw-bold text-uppercase text-muted">Email</label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="form-control form-control-lg bg-light"
                                    placeholder="nom@exemple.com"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Champ Mot de passe avec icône */}
                        <div className="mb-4">
                            <div className="d-flex justify-content-between">
                                <label htmlFor="password" className="form-label small fw-bold text-uppercase text-muted">Mot de passe</label>
                                <Link to="/forgot-password" size="sm" className="small text-decoration-none text-muted">Oublié ?</Link>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text"><i className="bi bi-lock"></i></span>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control form-control-lg bg-light"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Bouton Submit */}
                        <div className="d-grid mt-4">
                            <button type="submit" className="btn btn-login btn-lg shadow" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <span className="spinner-border spinner-border-sm" role="status"></span>
                                ) : (
                                    "SE CONNECTER"
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="position-relative my-5">
                        <hr className="text-muted" />
                        <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">OU</span>
                    </div>

                    {/* Section Inscription */}
                    <div className="text-center">
                        <p className="mb-2 text-muted small">Nouveau sur le terrain ?</p>
                        <Link to='/register' className="btn btn-outline-dark rounded-pill px-4 fw-bold w-100 btn-sm">
                            CRÉER UN COMPTE
                        </Link>
                    </div>
                </div>

                {/* Retour Home discret */}
                <div className="text-center mt-4">
                    <Link to="/" className="text-decoration-none text-muted small">
                        <i className="bi bi-house-door me-1"></i> Retour à la boutique
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sign;