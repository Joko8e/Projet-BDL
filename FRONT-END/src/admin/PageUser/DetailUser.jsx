import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios/axiosInstance.js";
import URL from "../../utils/constant/url.js";

const DetailUser = () => {

    const params = useParams();
    const { idUser } = params;

    const [user, setUser] = useState([])

    useEffect(() => {
        getUserById()
    }, [])

    const getUserById = async () => {
        try {
            const { data, status } = await axiosInstance.get(URL.GET_USER_BY_ID + '/' + idUser)
            if(status === 200) setUser(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <p>Nom: {user.nom}</p>
            <p>Prénom: {user.prenom}</p>
            <p>Email: {user.email}</p>
            <p>Adresse: {user.adresse}</p>
            <p>Ville: {user.ville}</p>
            <p>Code Postal: {user.code_postal}</p>
            <p>Rôle: {user.role}</p>
        </div>
    )
}

export default DetailUser;