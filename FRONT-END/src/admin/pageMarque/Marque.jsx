import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import URL from "../../utils/constant/url";
import { MARQUE_FIELDS } from "../../utils/config/FormFiedls";


const Marque = () => {

    const [marque, setMarque] = useState({
        nom: "",
        logo: "",
        description: ""
    });

    const [allMarque, setAllMarque] = useState([])

    useEffect(() => {
        getAllMarque()
    }, [])

    const getAllMarque = async () => {
        try {
            const { data, status } = await axios.get(URL.GET_ALL_MARQUE)
            setAllMarque(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteMarque = async (id) => {
        try {
            const { data, status } = await axios.delete(URL.DELETE_MARQUE + '/' + id)
            if (status === 200) {
                console.log('marque supprimé');
                getAllMarque();
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
            const { status } = await axios.post(URL.POST_MARQUE, marque)
            if (status === 201) {
                console.log('Marque créer!');
                getAllMarque();
                setMarque({ nom: "", logo: "", description: "" });
             } 
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div className="table-responsive"
        style={{ maxHeight: "500px", overflowY: "auto" }}>
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Nom</th>
                            <th>Logo</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allMarque.map((item, index) => (
                        <tr key={item._id}>
                            <td>{item.nom}</td>
                            <td>
                                <img src={item.logo} alt={item.nom} width={150} />        
                            </td>
                            <td>{item.description}</td>
                            <td>
                                <Link className="btn btn-info me-2" to={{pathname:`detail/${item._id}`}}>
                                    <i className="bi bi-eye"></i>        
                                </Link>
                                <Link className="btn btn-warning me-2" to={{pathname:`update/${item._id}`}}>
                                    <i className="bi bi-pencil"></i>
                                </Link>
                                <button className="btn btn-danger me-2" onClick={() => deleteMarque(item._id)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>   
                        ))}
                    </tbody>
                </table>
            </div>

            <form onSubmit={handleSubmit} className="container mt-4">
                <div className="row">
                    {MARQUE_FIELDS.map(field => (
                    <div key={field.id}>
                        <label className="form-label " htmlFor={field.id}>{field.label} </label>
                        <input className="form-control d-flex fw-bold" 
                        type={field.type}
                        name={field.name}
                        id={field.id}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                        />
                    </div>
                    ))}
                
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-primary">
                            Enregistrer
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Marque