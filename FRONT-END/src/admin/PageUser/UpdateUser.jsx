import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios/axiosInstance.js";
import URL from "../../utils/constant/url.js";

const UpdateUser = () => {

    const params = useParams();
    const { idUser } = params;
    const [user, setUser] = useState([])

    useEffect(() => {
        getUserById()
    }, [])

    const getUserById = async () => {
        try {
            const { data, status } = await axiosInstance.get(URL.GET_USER_BY_ID + '/' + idUser, user)
            if (status === 200) setUser(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setUser(prevUser => ({...prevUser, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { status } = await axiosInstance.put(URL.UPDATE_USER + '/' + idUser, user)
            if (status === 201) console.log('User modifié!');
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <>
            <h1>Update User</h1>
            <form onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="nom">Nom</label>
                <input className="form-control" id='name' type="text" name='nom' value={user.nom || ""} onChange={handleChange} />
            <label className="form-label"htmlFor="prenom">Prénom</label>
                <input className="form-control" id='prenom' type="text" name='prenom' value={user.prenom || ""} onChange={handleChange}/>
            <label className="form-label" htmlFor="email">Email</label>
                <input className="form-control" id='email' type="email" name='email' value={user.email || ""} onChange={handleChange} />
            <label className="form-label" htmlFor="adresse">Adresse</label>
                <input className="form-control" id='adresse' type="text" name='adresse' value={user.adresse || ""} onChange={handleChange} />
            <label className="form-label" htmlFor="ville">Ville</label>
                <input className="form-control" id='ville' type="text" name='ville' value={user.ville || ""} onChange={handleChange} />
            <label className="form-label" htmlFor="code_postal">Code Postal</label>
                <input className="form-control" id='code_postal' type="text" name='code_postal' value={user.code_postal || ""} onChange={handleChange} />
            <button>Envoyer</button>
            </form>
        </>
    )
}

export default UpdateUser