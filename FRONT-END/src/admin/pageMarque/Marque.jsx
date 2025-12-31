import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import URL from "../../utils/constant/url";
import { MARQUE_FIELDS } from "../../utils/config/FormFiedls";
import { Modal } from "bootstrap";
import axiosInstance from "../../utils/axios/axiosInstance.js";


const Marque = () => {

    const [marque, setMarque] = useState({
        nom: "",
        logo: "",
        description: ""
    });

    const [allMarque, setAllMarque] = useState([])

    //state pour stocker l'id de la marque à supprimer
    const [marqueToDelete, setMarqueToDelete] = useState(null);

    useEffect(() => {
        getAllMarque()
    }, [])

    const getAllMarque = async () => {
        try {
            const { data, status } = await axiosInstance.get(URL.GET_ALL_MARQUE)
            setAllMarque(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    //fonction pour ouvrir le modal de confirmation de suppression
    const confirmDelete = (_id) => {
        setMarqueToDelete(_id);

        // Ouvrir le modal
        const modal = new Modal(
            document.getElementById("deleteModal")
        );
        modal.show();
    };

    const deleteMarque = async (_id) => {
        if(!marqueToDelete) return;
        try {
            const { data, status } = await axiosInstance.delete(URL.DELETE_MARQUE + '/' + _id)
            if (status === 200) {
                console.log('marque supprimé');
                getAllMarque();
            }
        } catch (error) {
            console.log(error.message);
        }

        // Fermer le modal après la suppression
        const modalElement = document.getElementById("deleteModal");
        const modal = Modal.getInstance(modalElement);
        modal.hide();
        setMarqueToDelete(null);
    }

    

    const handleChange = (event) => {
        const { name, value } = event.target
        setMarque(prevMarque => ({...prevMarque, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("donnée envoyer au back", marque);
        
        try {
            const { status } = await axiosInstance.post(URL.POST_MARQUE, marque)
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
                    <thead className="table-dark text-center align-middle sticky-top">
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
                                <button className="btn btn-danger me-2" onClick={() => confirmDelete(item._id)}>
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
                    <div key={field.id} className="col-12 col-md-6">
                        <label className="form-label " htmlFor={field.id}>{field.label} </label>
                        <input className="form-control d-flex fw-bold" 
                        type={field.type}
                        name={field.name}
                        id={field.id}
                        placeholder={field.placeholder}
                        value={marque[field.name]}        
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

            {/* Modal de confirmation de suppression */}
            <div className="modal fade" id="deleteModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Confirmer la suppression</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            Êtes-vous sûr de vouloir supprimer cette marque ?
                            <br />
                            <strong>Cette action est irréversible.</strong>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Annuler
                            </button>

                            <button type="button" className="btn btn-danger" onClick={() => deleteMarque(marqueToDelete)}>
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Marque