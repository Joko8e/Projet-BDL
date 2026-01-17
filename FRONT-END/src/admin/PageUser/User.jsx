import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios/axiosInstance.js";
import { Modal } from "bootstrap";
import { Link } from "react-router-dom";
import URL from "../../utils/constant/url.js";
import { USER_FIELDS } from "../../utils/config/FormFiedls.js";

const User = () => {
    const [users, setUsers] = useState([]);
    const [userToDelete, setUserToDelete] = useState(null);
    const [dataUser, setDataUser] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        adresse: "",
        ville: "",
        code_postal: "",
        role: ""
    });

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const { data, status } = await axiosInstance.get(URL.GET_ALL_USERS);
            if (status === 200) setUsers(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataUser((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { status } = await axiosInstance.post(URL.POST_USER, dataUser);
            if (status === 201) {
                console.log("User created successfully");
                await getAllUsers(); // Recharge la liste des utilisateurs
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const confirmDelete = (id) => {
                setUserToDelete(id);
        
                // Ouvrir le modal
                const modal = new Modal(
                    document.getElementById("deleteModal")
                );
                modal.show();
            };

        const deleteUser = async (id) => {
            try {
                const { status } = await axiosInstance.delete(URL.DELETE_USER+`/`+ id);
                if (status === 200) {
                    console.log("User supprimé avec succès");
                    await getAllUsers(); // Recharge la liste des utilisateurs
                }
            } catch (error) {
                console.log(error.message);
            } finally {
    
            // Fermer le modal après la suppression
            const modalElement = document.getElementById("deleteModal");
            const modal = Modal.getInstance(modalElement);
            if(modal) modal.hide();
                setUserToDelete(null);
            }
    };    
    

    return (
        <div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark sticky-top">
                        <tr>
                            <th>ID</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Adresse</th>
                            <th>Ville</th>
                            <th>Code Postal</th>
                            <th>Vérifié</th>
                            <th>Role</th>
                            <th>Date d'inscription</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user._id}</td>
                                <td>{user.nom}</td>
                                <td>{user.prenom}</td>
                                <td>{user.email}</td>
                                <td>{user.adresse}</td>
                                <td>{user.ville}</td>
                                <td>{user.code_postal}</td>
                                <td>{user.isVerified ? "Oui" : "Non"}</td>
                                <td>{user.role}</td>
                                {/* new Date().toLocaleDateString() sert à formater la date d'inscription pour l'affichage */}
                                <td>{new Date(user.date_inscription).toLocaleDateString()}</td>
                                <td>
                                    <Link to={`/admin/user/${user._id}`} className="btn btn-primary btn-sm me-2">
                                        <i className="bi bi-eye"></i>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/admin/user/${user._id}`} className="btn btn-warning btn-sm me-2">
                                        <i className="bi bi-pencil"></i>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => confirmDelete(user._id)} className="btn btn-danger btn-sm">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <form onSubmit={handleSubmit} className="container mt-4">
                <h2>Ajouter un nouvel utilisateur</h2>
                <div className="row">
                    {USER_FIELDS.map((field) => (
                        <div className={`mb-3 ${field.fullWidth ? "col-12" : "col-6"}`} key={field.id}> 
                            {/* field.fullWidth ? sert à déterminer si le champ doit occuper toute la largeur (col-12) ou la moitié (col-6) */}
                        <label htmlFor={field.id} className="form-label d-flex fw-bold">{field.label}
                        </label>
                        {field.name === "role" ? (
                            <select
                            className="form-select"
                            id={field.id}
                            name={field.name}
                            onChange={handleChange}
                            >
                                <option value="">{field.placeholder}</option>
                                <option value={field.option1}>{field.option1}</option>
                                <option value={field.option2}>{field.option2}</option>
                            </select>
                        ) : (
                            <input
                                type={field.type}
                                id={field.id}
                                name={field.name}
                                placeholder={field.placeholder}
                                onChange={handleChange}
                                className="form-control"
                            />
                        )}
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
                            Êtes-vous sûr de vouloir supprimer cet utilisateur ?
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

                            <button type="button" className="btn btn-danger" onClick={() => deleteUser(userToDelete)}>
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    
        </div>
    );
};

export default User;