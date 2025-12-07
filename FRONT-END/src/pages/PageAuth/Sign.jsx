import React, { useState, useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";
import { Link } from "react-router-dom";

const Sign = () => {
    const {login}= useContext(AuthContext);
    const [formData, setFormData] = useState({email:"", password:""});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((user) => ({...user, [name]: value}));
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" name="email" onChange={handleChange} />

                <label>Password:</label>
                <input type="password" name="password" onChange={handleChange} />
                <button type="submit">Sign In</button>
            </form>
            <div>
                <p>Pas encore insrit ? cliquer ici</p>
                <Link to='/register'>S'enregistrer</Link>
            </div>
        </div>
    )
}

export default Sign;