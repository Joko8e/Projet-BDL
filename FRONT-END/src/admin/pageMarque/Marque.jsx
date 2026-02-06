import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "bootstrap";
import URL from "../../utils/constant/url";
import { MARQUE_FIELDS } from "../../utils/config/FormFiedls";
import axiosInstance from "../../utils/axios/axiosInstance.js";

const Marque = () => {
    const [marque, setMarque] = useState({ nom: "", logo: "", description: "" });
    const [allMarque, setAllMarque] = useState([]);
    const [marqueToDelete, setMarqueToDelete] = useState(null);

    useEffect(() => { getAllMarque(); }, []);

    const getAllMarque = async () => {
        try {
            const { data } = await axiosInstance.get(URL.GET_ALL_MARQUE);
            setAllMarque(data);
        } catch (error) { console.log(error.message); }
    };

    const confirmDelete = (_id) => {
        setMarqueToDelete(_id);
        const modal = new Modal(document.getElementById("deleteModal"));
        modal.show();
    };

    const deleteMarque = async (_id) => {
        if (!marqueToDelete) return;
        try {
            const { status } = await axiosInstance.delete(`${URL.DELETE_MARQUE}/${_id}`);
            if (status === 200) getAllMarque();
        } catch (error) { console.log(error.message); }
        const modal = Modal.getInstance(document.getElementById("deleteModal"));
        modal.hide();
        setMarqueToDelete(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMarque(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { status } = await axiosInstance.post(URL.POST_MARQUE, marque);
            if (status === 201) {
                getAllMarque();
                setMarque({ nom: "", logo: "", description: "" });
            }
        } catch (error) { console.log(error.message); }
    };

    return (
        <div className="container-fluid py-4">
            <div className="row g-4">
                
                {/* SECTION FORMULAIRE (À GAUCHE OU EN HAUT) */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm sticky-top" style={{ top: "100px", borderRadius: "20px" }}>
                        <div className="card-header bg-white border-0 pt-4 px-4">
                            <h5 className="fw-bold" style={{ color: "#552583" }}>
                                <i className="bi bi-plus-circle-fill me-2 text-warning"></i>
                                Ajouter une Marque
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                {MARQUE_FIELDS.map(field => (
                                    <div key={field.id} className="mb-3">
                                        <label className="form-label small fw-bold text-muted">{field.label}</label>
                                        <input 
                                            className="form-control border-0 bg-light shadow-none py-2" 
                                            type={field.type}
                                            name={field.name}
                                            placeholder={field.placeholder}
                                            value={marque[field.name]}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                ))}
                                <button type="submit" className="btn w-100 fw-bold mt-2 py-2" 
                                        style={{ backgroundColor: "#552583", color: "#FDB927", borderRadius: "10px" }}>
                                    ENREGISTRER LA MARQUE
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* SECTION TABLEAU (À DROITE) */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm" style={{ borderRadius: "20px" }}>
                        <div className="card-header bg-white border-0 pt-4 px-4 d-flex justify-content-between align-items-center">
                            <h5 className="fw-bold m-0" style={{ color: "#552583" }}>Marques Enregistrées</h5>
                            <span className="badge bg-light text-dark rounded-pill">{allMarque.length} marques</span>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive" style={{ maxHeight: "600px" }}>
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="bg-light text-muted small text-uppercase">
                                        <tr>
                                            <th className="px-4 py-3">Marque</th>
                                            <th className="py-3">Description</th>
                                            <th className="py-3 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allMarque.map((item) => (
                                            <tr key={item._id} className="border-bottom">
                                                <td className="px-4 py-3">
                                                    <div className="d-flex align-items-center">
                                                        <div className="bg-light rounded p-2 me-3" style={{ width: "60px", height: "60px", display: "flex", alignItems: "center" }}>
                                                            <img src={item.logo} alt={item.nom} className="img-fluid rounded" />
                                                        </div>
                                                        <span className="fw-bold">{item.nom}</span>
                                                    </div>
                                                </td>
                                                <td className="text-muted small">
                                                    {item.description.substring(0, 60)}...
                                                </td>
                                                <td className="text-center">
                                                    <div className="btn-group shadow-sm rounded">
                                                        <Link className="btn btn-white btn-sm" to={`detail/${item._id}`} title="Voir">
                                                            <i className="bi bi-eye text-info"></i>
                                                        </Link>
                                                        <Link className="btn btn-white btn-sm border-start border-end" to={`update/${item._id}`} title="Modifier">
                                                            <i className="bi bi-pencil-square text-warning"></i>
                                                        </Link>
                                                        <button className="btn btn-white btn-sm" onClick={() => confirmDelete(item._id)} title="Supprimer">
                                                            <i className="bi bi-trash3-fill text-danger"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de suppression (thème épuré) */}
            <div className="modal fade" id="deleteModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow shadow-lg" style={{ borderRadius: "20px" }}>
                        <div className="modal-body text-center p-5">
                            <i className="bi bi-exclamation-triangle text-danger display-1 mb-4"></i>
                            <h3 className="fw-bold mb-3">Supprimer ?</h3>
                            <p className="text-muted">Êtes-vous sûr de vouloir supprimer cette marque ? Cette action est irréversible.</p>
                            <div className="d-flex justify-content-center gap-3 mt-4">
                                <button className="btn btn-light px-4 rounded-pill fw-bold" data-bs-dismiss="modal">ANNULER</button>
                                <button className="btn btn-danger px-4 rounded-pill fw-bold" onClick={() => deleteMarque(marqueToDelete)}>SUPPRIMER</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Marque;