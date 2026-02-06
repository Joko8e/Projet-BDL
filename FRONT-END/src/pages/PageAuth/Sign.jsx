import React, { useState, useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { Link } from "react-router-dom";

const Sign = () => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((user) => ({ ...user, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px", borderRadius: "15px" }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">Connexion</h2>
                    <p className="text-muted">Heureux de vous revoir !</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Champ Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control form-control-lg"
                            placeholder="nom@exemple.com"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Champ Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label fw-semibold">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control form-control-lg"
                            placeholder="••••••••"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Bouton Submit */}
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary btn-lg shadow-sm">
                            Se connecter
                        </button>
                    </div>
                </form>

                <hr className="my-4" />

                {/* Section Inscription */}
                <div className="text-center">
                    <p className="mb-1 text-muted">Pas encore inscrit ?</p>
                    <Link to='/register' className="text-decoration-none fw-bold text-primary">
                        Créer un compte
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sign;