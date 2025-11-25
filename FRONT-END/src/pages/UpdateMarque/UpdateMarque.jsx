import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import URL from "../../utils/constant/url";

const UpdateMarque = () => {
    const params = useParams();
    const { idMarque } = params;

    const [marque, setMarque] = useState([])

    useEffect(() => {
        getMarqueById()
    }, [])

    const getMarqueById = async () => {
        try {
            const { data, status } = await axios.get(URL.GET_MARQUE_BY_ID + "/" + idMarque, marque)
            if (status === 200) {
                setMarque(data)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setMarque(prevMarque => ({...prevMarque, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { status } = await axios.put(URL.UPDATE_MARQUE + '/' + idMarque, marque)
            if (status === 201) console.log('Marque modifié!');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <h1>Update Marque</h1>
            <form onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="nom">Nom</label>
            <input className="form-control" id='name' type="text" name='nom' value={marque.nom || ""} onChange={handleChange}/>

            <label className="form-label"htmlFor="description">Description</label>
            <textarea className="form-control" id='description' name='description' value={marque.description || ""} onChange={handleChange}/>

            <label className="form-label" htmlFor="logo">Logo</label>
            <input className="form-control" id='logo' type="text" name='logo' value={marque.logo || ""} onChange={handleChange}/>

            <button>Envoyer</button>
            </form>
        </>
    )
}

export default UpdateMarque