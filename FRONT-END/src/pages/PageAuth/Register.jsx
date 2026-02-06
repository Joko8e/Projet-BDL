import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utils/context/AuthContext";
import { REGISTER_FIELDS } from "../../utils/config/FormFiedls.js";

const Register = () => {
    const { register } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({})

    const handleChange = (event) => {
        const { name, value } = event.target;
        // Mettre à jour l'état de l'utilisateur avec les nouvelles valeurs du formulaire
        setUser((user) => ({...user, [name]: value}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // vérifier que les champs sont remplis
        if (!user.nom || !user.prenom || !user.email || !user.password || !user.adresse || !user.ville || !user.code_postal) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }

        setIsLoading(true);

        try {
            // Appeler la fonction d'inscription du contexte d'authentification
            await register(user);
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            alert("Une erreur est survenue lors de l'inscription. Veuillez réessayer plus tard.");
        } finally {
            setIsLoading(false);
        }
    }   


    return (
        <div className="container mt-5">
            <div className="row shadow rounded overflow-hidden">
                    <h1 className="text-center mb-4">Register</h1>
                    <form onSubmit={handleSubmit}>
                        {REGISTER_FIELDS.map((field, index) => (
                            <div className="input-group flex-nowrap mb-3" key={index}>
                                <span className="input-group-text">
                                    <i className={field.icon}></i>
                                </span>
                                {/* <label className="" htmlFor={field.id}>{field.name}</label> */}
                                <input
                                    type={field.type}
                                    name={field.name}
                                    id={field.id}
                                    placeholder={field.placeholder}
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                    <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                        {isLoading ? "Inscription en cours..." : "S'inscrire"}
                    </button>
                        
                    </form>
                    <p className="text-center mt-3">
                        Déjà un compte ?
                        <Link to="/sign">Sign In</Link>
                    </p>
            </div>
        </div>
    )
}

export default Register;