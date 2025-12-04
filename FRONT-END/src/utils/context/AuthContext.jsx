import React from "react";
import { createContext, useState, useEffect } from "react";

// URL
import URL from "../constant/url";
import axios from "axios";

// Créer le contexte d'authentification

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => { 

    // État pour stocker les informations d'authentification
    const [user, setUser] = useState(null);

    // Fonction pour vérifier l'authentification de l'utilisateur
    const login = async (dataForm) => {
        try {
            // requete axios pour se connecter
            const { data, status } = await axios.post(URL.AUTH_SIGN, dataForm)
            if (status === 200) {
                setUser(data.user);
            }
        } catch (error) {
            console.log(error.message);
        }

    return (
        <AuthContext.Provider value={{login, user}}>
            {children}
        </AuthContext.Provider>
        )
    }
}

export default AuthProvider;