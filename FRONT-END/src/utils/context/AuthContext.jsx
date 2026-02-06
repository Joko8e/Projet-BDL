import React from "react";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// URL
import URL from "../constant/url";
import axiosInstance from "../axios/axiosInstance";

// Créer le contexte d'authentification

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => { 

    const [isLoading, setIsLoading] = useState(false);
    // État pour stocker les informations d'authentification
    const [user, setUser] = useState(null);

    const navigate = useNavigate(); // UseNavigate hook pour la navigation sert à rediriger l'utilisateur après la connexion

    useEffect(() => {
        isLoggedIn();
    }, []);


    // Fonction pour vérifier l'authentification de l'utilisateur
    const login = async (dataForm) => {
        try {
            // requete axios pour se connecter
            const { data, status } = await axiosInstance.post(URL.AUTH_SIGN, dataForm)
            if (status === 200) {
                // sauver les informations d'authentification dans le stockage local
                localStorage.setItem("auth", JSON.stringify(data));

                // Mettre à jour le state avec les informations de l'utilisateur connecté
                setUser(data);
                

                // Rediriger vers la page d'accueil
                navigate(`/`);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            // Désactive l'indicateur de chargement car l'authentification est terminée
            setIsLoading(false);
        }
    }

    // Gestion de l'inscription
    const register = async (dataForm) => {
        setIsLoading(true);
        try {
            const {status} = await axiosInstance.post(URL.AUTH_REGISTER, dataForm);
            if (status === 201) {
                console.log("success register");
                // alert
                alert("Inscription réussie ! Veuillez vérifier votre email pour activer votre compte.");
                navigate("/sign");
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const isLoggedIn = async () => {
        setIsLoading(true);
        try {
            // on récupère les donnnées d'authentification dans le stockage local
            const userData = localStorage.getItem("auth");
            

            // on met a l'état de l'utilisateur avec les données récupérées
            setUser(userData ? JSON.parse(userData) : null);
        } catch (error) {
            console.log(error.message);
        } finally {
            // Désactive l'indicateur de chargement car la vérification est terminée
            setIsLoading(false);
        }
    }

    const logout = () => {
        setIsLoading(true);
        setUser(null); // Réinitialiser l'état de l'utilisateur à null

        localStorage.removeItem("auth"); // Supprimer les données d'authentification du stockage local
        navigate("/"); // Rediriger vers la page d'accueil
        
        setIsLoading(false);
    }

    return (
        <AuthContext.Provider value={{login, user, logout, register, isLoading}}>
            {children}
        </AuthContext.Provider>
        )
    
}