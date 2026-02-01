import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import URL from "../../utils/constant/url";
import axiosInstance from "../../utils/axios/axiosInstance.js";
import { MARQUE_FIELDS } from "../../utils/config/FormFiedls.js";

const UpdateMarque = () => {
    const params = useParams();
    const { idMarque } = params;

    const [marque, setMarque] = useState([])

    useEffect(() => {
        getMarqueById()
    }, [])

    const getMarqueById = async () => {
        try {
            const { data, status } = await axiosInstance.get(URL.GET_MARQUE_BY_ID + "/" + idMarque, marque)
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
            const { status } = await axiosInstance.put(URL.UPDATE_MARQUE + '/' + idMarque, marque)
            if (status === 201) console.log('Marque modifié!');
            alert('Marque mis à jour avec succès!');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <h1>Update Marque</h1>
            <form onSubmit={handleSubmit} className="container mt-4">
                <div className="row">
                    {MARQUE_FIELDS.map((field) => 
                        <div key={field.id} className="mb-3 col-md-6">
                            <label htmlFor={field.id} className="form-label">{field.label}</label>
                            <input
                                type={field.type}
                                className="form-control"
                                id={field.id}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={marque[field.name] || ''}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Mettre à jour la marque</button>
            </form>
        </>
    )
}

export default UpdateMarque