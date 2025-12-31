import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../utils/context/AuthContext";
import { REGISTER_FIELDS } from "../../utils/config/FormFiedls.js";

const Register = () => {
    const { register } = useContext(AuthContext);

    const [user, setUser] = useState({})

    const handleChange = (event) => {
        const { name, value } = event.target;
        // Mettre à jour l'état de l'utilisateur avec les nouvelles valeurs du formulaire
        setUser((user) => ({...user, [name]: value}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Appeler la fonction d'inscription du contexte d'authentification
        await register(user);
    }   


    return (
        <div className="container mt-5">
                    <h1 className="text-center mb-4">Register</h1>
                    <form onSubmit={handleSubmit}>
                        {REGISTER_FIELDS.map((field, index) => (
                            <div className="input-group flex-nowrap mb-3" key={index}>
                                <span className="input-group-text mb-3">
                                    <i className={field.icon}></i>
                                </span>
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
                        <button type="submit" className="btn btn-primary w-100">Sign</button>
                        
                    </form>
                    <p className="text-center mt-3">
                        Déjà un compte ?
                        <Link to="/sign">Sign In</Link>
                    </p>
        </div>
    )
}

export default Register;