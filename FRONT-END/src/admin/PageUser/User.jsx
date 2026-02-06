import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios/axiosInstance.js";
import { Modal } from "bootstrap";
import { Link } from "react-router-dom";
import URL from "../../utils/constant/url.js";
import { USER_FIELDS } from "../../utils/config/FormFiedls.js";

const User = () => {
    const [users, setUsers] = useState([]);
    const [userToDelete, setUserToDelete] = useState(null);
    const [dataUser, setDataUser] = useState({
        nom: "", prenom: "", email: "", password: "",
        adresse: "", ville: "", code_postal: "", role: ""
    });

    useEffect(() => { getAllUsers(); }, []);

    const getAllUsers = async () => {
        try {
            const { data } = await axiosInstance.get(URL.GET_ALL_USERS);
            setUsers(data);
        } catch (error) { console.log(error.message); }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { status } = await axiosInstance.post(URL.POST_USER, dataUser);
            if (status === 201) await getAllUsers();
        } catch (error) { console.log(error.message); }
    };

    const confirmDelete = (id) => {
        setUserToDelete(id);
        const modal = new Modal(document.getElementById("deleteModal"));
        modal.show();
    };

    const deleteUser = async (id) => {
        try {
            const { status } = await axiosInstance.delete(`${URL.DELETE_USER}/${id}`);

            if (status === 200) {
                // 1. On ferme d'abord le modal proprement via l'instance Bootstrap
                const modalElement = document.getElementById("deleteModal");
                const modalInstance = Modal.getInstance(modalElement);
                if (modalInstance) {
                    modalInstance.hide();
                }

                // 2. On attend un tout petit peu que l'animation du modal finisse 
                // pour éviter les bugs visuels, puis on recharge les données
                setTimeout(async () => {
                    await getAllUsers();
                    setUserToDelete(null); // On nettoie l'ID stocké
                }, 300);

                console.log("Utilisateur supprimé et liste mise à jour");
            }
        } catch (error) {
            console.log("Erreur lors de la suppression:", error.message);
            // Optionnel: ajouter une alerte si la suppression échoue
        }
    };

    return (
        <div className="container-fluid py-4">
            {/* HEADER AVEC STATS RAPIDES */}
            <div className="row mb-4 g-3 align-items-center">
                <div className="col-md-6">
                    <h2 className="fw-bold m-0" style={{ color: "#552583" }}>Gestion des Utilisateurs</h2>
                    <p className="text-muted small">{users.length} membres enregistrés</p>
                </div>
                <div className="col-md-6 text-md-end">
                    <button className="btn btn-dark fw-bold px-4 rounded-pill shadow-sm" data-bs-toggle="collapse" data-bs-target="#addUserCollapse">
                        <i className="bi bi-person-plus-fill me-2"></i> Nouvel Utilisateur
                    </button>
                </div>
            </div>

            {/* FORMULAIRE D'AJOUT COLLAPSIBLE */}
            <div className="collapse mb-4" id="addUserCollapse">
                <div className="card border-0 shadow-sm" style={{ borderRadius: "20px" }}>
                    <div className="card-body p-4">
                        <h5 className="fw-bold mb-4">Créer un profil</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                {USER_FIELDS.map((field) => (
                                    <div className={field.fullWidth ? "col-12" : "col-md-6"} key={field.id}>
                                        <label className="form-label small fw-bold text-muted">{field.label}</label>
                                        {field.name === "role" ? (
                                            <select className="form-select border-0 bg-light py-2" name={field.name} onChange={handleChange} required>
                                                <option value="">{field.placeholder}</option>
                                                <option value={field.option1}>{field.option1}</option>
                                                <option value={field.option2}>{field.option2}</option>
                                            </select>
                                        ) : (
                                            <input type={field.type} name={field.name} placeholder={field.placeholder} onChange={handleChange} className="form-control border-0 bg-light py-2" required />
                                        )}
                                    </div>
                                ))}
                                <div className="col-12 mt-4">
                                    <button type="submit" className="btn btn-warning fw-bold px-5">ENREGISTRER</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* TABLEAU DES UTILISATEURS */}
            <div className="card border-0 shadow-sm" style={{ borderRadius: "20px", overflow: "hidden" }}>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr className="text-muted small text-uppercase">
                                <th className="ps-4 py-3">Utilisateur</th>
                                <th>Localisation</th>
                                <th>Statut</th>
                                <th>Rôle</th>
                                <th>Inscription</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="ps-4">
                                        <div className="d-flex align-items-center">
                                            <div className="rounded-circle bg-soft-primary d-flex align-items-center justify-content-center text-white fw-bold me-3"
                                                style={{ width: "45px", height: "45px", backgroundColor: "#552583" }}>
                                                {user.nom.charAt(0)}{user.prenom.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="fw-bold text-dark">{user.nom} {user.prenom}</div>
                                                <div className="text-muted small">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="small">{user.ville}</div>
                                        <div className="text-muted small text-uppercase" style={{ fontSize: '10px' }}>{user.code_postal}</div>
                                    </td>
                                    <td>
                                        {user.isVerified ? (
                                            <span className="badge rounded-pill bg-success-subtle text-success px-3">Vérifié</span>
                                        ) : (
                                            <span className="badge rounded-pill bg-light text-muted px-3">En attente</span>
                                        )}
                                    </td>
                                    <td>
                                        <span className={`fw-bold small ${user.role === 'admin' ? 'text-danger' : 'text-primary'}`}>
                                            <i className={`bi ${user.role === 'admin' ? 'bi-shield-lock' : 'bi-person'} me-1`}></i>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="text-muted small">
                                        {new Date(user.date_inscription).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td className="text-center px-4">
                                        <div className="d-flex justify-content-center gap-2">
                                            <Link to={`/admin/user/${user._id}`} className="btn btn-light btn-sm rounded-circle"><i className="bi bi-eye text-primary"></i></Link>
                                            <Link to={`/admin/user/${user._id}`} className="btn btn-light btn-sm rounded-circle"><i className="bi bi-pencil text-warning"></i></Link>
                                            <button onClick={() => confirmDelete(user._id)} className="btn btn-light btn-sm rounded-circle"><i className="bi bi-trash text-danger"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL DE SUPPRESSION STYLE "ALERT" */}
            <div className="modal fade" id="deleteModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow" style={{ borderRadius: "20px" }}>
                        <div className="modal-body p-5 text-center">
                            <h4 className="fw-bold mb-3">Supprimer cet utilisateur ?</h4>
                            <p className="text-muted">Toutes les données liées à ce profil seront effacées de la base de données.</p>
                            <div className="d-flex justify-content-center gap-3 mt-4">
                                <button className="btn btn-light px-4 rounded-pill fw-bold" data-bs-dismiss="modal">ANNULER</button>
                                <button className="btn btn-danger px-4 rounded-pill fw-bold" onClick={() => deleteUser(userToDelete)}>SUPPRIMER DÉFINITIVEMENT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;