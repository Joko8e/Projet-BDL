import React, { use, useState, useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext";

const Sign = () => {
    const {login}= useContext(AuthContext);
    const [user, setUser] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((user) => ({...user, [name]: value}));
    } 

    const handleSubmit = () => {
        login(user);
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
        </div>
    )
}

export default Sign;