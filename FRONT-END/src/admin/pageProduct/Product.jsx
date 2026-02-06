import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "bootstrap";
import URL from "../../utils/constant/url";
import axiosInstance from "../../utils/axios/axiosInstance";
import { PRODUCT_FIELDS } from "../../utils/config/FormFiedls";

const Product = () => {
    const initialState = {
        id_marque: "", nom: "", category: "",
        attributes: { color: "", size: [], weight: "", pied: "" },
        modele: "", photo: "", description: "", stock: "", price: ""
    };

    const [product, setProduct] = useState(initialState);
    const [allProduct, setAllProduct] = useState([]);
    const [allMarque, setAllMarque] = useState([]);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => { getAllProduct(); getAllMarque(); }, []);

    const getAllProduct = async () => {
        try {
            const { data } = await axiosInstance.get(URL.GET_ALL_PRODUIT);
            setAllProduct(data);
        } catch (error) { console.log(error.message); }
    };

    const getAllMarque = async () => {
        try {
            const { data } = await axiosInstance.get(URL.GET_ALL_MARQUE);
            setAllMarque(data);
        } catch (error) { console.log(error.message); }
    };

    const confirmDelete = (_id) => {
        setProductToDelete(_id);
        const modal = new Modal(document.getElementById("deleteModal"));
        modal.show();
    };

    const deleteProduct = async (_id) => {
        try {
            const { status } = await axiosInstance.delete(`${URL.DELETE_PRODUIT}/${_id}`);
            if (status === 200) getAllProduct();
        } catch (error) { console.log(error.message); }
        const modal = Modal.getInstance(document.getElementById("deleteModal"));
        modal.hide();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (["color", "weight", "pied"].includes(name)) {
            setProduct(prev => ({
                ...prev, attributes: { ...prev.attributes, [name]: value }
            }));
        } else {
            setProduct(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSizeChange = (size) => {
        setProduct(prev => {
            const currentSizes = prev.attributes?.size || [];
            const sizes = currentSizes.includes(size)
                ? currentSizes.filter(s => s !== size)
                : [...currentSizes, size];
            return { ...prev, attributes: { ...prev.attributes, size: sizes } };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { status } = await axiosInstance.post(URL.POST_PRODUIT, product);
            if (status === 201) {
                getAllProduct();
                setProduct(initialState);
                alert("Produit ajouté !");
            }
        } catch (error) { console.log(error.message); }
    };

    return (
        <div className="container-fluid py-4">
            {/* EN-TÊTE DE PAGE */}
            <div className="d-flex justify-content-between align-items-center mb-4 px-2">
                <div>
                    <h2 className="fw-bold m-0" style={{ color: "#552583" }}>Catalogue Produits</h2>
                    <p className="text-muted small">Gérez votre inventaire et vos variantes</p>
                </div>
                <button className="btn btn-warning fw-bold shadow-sm" data-bs-toggle="collapse" data-bs-target="#formCollapse">
                    <i className="bi bi-plus-lg me-2"></i>Nouveau Produit
                </button>
            </div>

            {/* FORMULAIRE D'AJOUT (COLLAPSIBLE POUR GAGNER DE LA PLACE) */}
            <div className="collapse mb-5" id="formCollapse">
                <div className="card border-0 shadow-sm p-4" style={{ borderRadius: "20px" }}>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row g-3">
                                    {PRODUCT_FIELDS.filter(f => f.type !== "checkbox-group").map((field, index) => (
                                        <div className="col-md-6" key={index}>
                                            <label className="form-label small fw-bold">{field.label}</label>
                                            {field.type === "select" ? (
                                                <select className="form-select border-0 bg-light py-2" name={field.name} value={product[field.name]} onChange={handleChange} required>
                                                    <option value="">{field.placeholder}</option>
                                                    {[field.option1, field.option2, field.option3].filter(Boolean).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                            ) : (
                                                <input className="form-control border-0 bg-light py-2" type={field.type} name={field.name} placeholder={field.placeholder} 
                                                    value={field.name in product.attributes ? product.attributes[field.name] : product[field.name]} onChange={handleChange} required />
                                            )}
                                        </div>
                                    ))}
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold">Marque</label>
                                        <select className="form-select border-0 bg-light py-2" name="id_marque" value={product.id_marque} onChange={handleChange} required>
                                            <option value="">Sélectionner une marque</option>
                                            {allMarque.map(m => <option key={m._id} value={m._id}>{m.nom}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            {/* SECTION TAILLES (CHECKBOXES) */}
                            <div className="col-md-4 border-start">
                                <label className="form-label small fw-bold mb-3 d-block">Pointures disponibles</label>
                                <div className="d-flex flex-wrap gap-2">
                                    {PRODUCT_FIELDS.find(f => f.type === "checkbox-group")?.options.map(size => (
                                        <div key={size}>
                                            <input type="checkbox" className="btn-check" id={`size-${size}`} checked={product.attributes?.size?.includes(size)} onChange={() => handleSizeChange(size)} />
                                            <label className="btn btn-outline-secondary btn-sm rounded-pill px-3" htmlFor={`size-${size}`}>{size}</label>
                                        </div>
                                    ))}
                                </div>
                                <button type="submit" className="btn w-100 mt-4 py-3 fw-bold shadow" style={{ backgroundColor: "#552583", color: "#FDB927" }}>
                                    AJOUTER AU CATALOGUE
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* TABLEAU DES PRODUITS */}
            <div className="card border-0 shadow-sm" style={{ borderRadius: "20px" }}>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr className="small text-muted text-uppercase">
                                <th className="ps-4">Produit</th>
                                <th>Catégorie</th>
                                <th>Modèle / Marque</th>
                                <th>Stock</th>
                                <th>Prix</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allProduct.map((item) => (
                                <tr key={item._id} className="border-bottom">
                                    <td className="ps-4">
                                        <div className="d-flex align-items-center py-2">
                                            <img src={item.photo} alt={item.nom} className="rounded me-3 shadow-sm" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                                            <div>
                                                <div className="fw-bold">{item.nom}</div>
                                                <div className="small text-muted">{item.attributes?.color} | {item.attributes?.pied}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span className="badge bg-light text-dark">{item.category}</span></td>
                                    <td>
                                        <div className="small fw-bold">{item.modele}</div>
                                        <div className="small text-muted">{item.id_marque?.nom}</div>
                                    </td>
                                    <td>
                                        <span className={`fw-bold ${item.stock < 5 ? 'text-danger' : 'text-success'}`}>
                                            {item.stock} <small className="text-muted">unités</small>
                                        </span>
                                    </td>
                                    <td className="fw-bold text-dark">{item.price} €</td>
                                    <td className="text-center">
                                        <div className="btn-group border rounded-pill overflow-hidden bg-white shadow-sm">
                                            <Link className="btn btn-sm px-3" to={`detail/${item._id}`}><i className="bi bi-eye text-primary"></i></Link>
                                            <Link className="btn btn-sm px-3 border-start" to={`update/${item._id}`}><i className="bi bi-pencil text-warning"></i></Link>
                                            <button className="btn btn-sm px-3 border-start" onClick={() => confirmDelete(item._id)}><i className="bi bi-trash3 text-danger"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL DE SUPPRESSION */}
            <div className="modal fade" id="deleteModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg p-3" style={{ borderRadius: "25px" }}>
                        <div className="modal-body text-center">
                            <div className="mb-4 text-danger"><i className="bi bi-x-circle display-1"></i></div>
                            <h4 className="fw-bold">Supprimer le produit ?</h4>
                            <p className="text-muted">Le produit sera définitivement retiré de la boutique.</p>
                            <div className="d-flex justify-content-center gap-2 mt-4">
                                <button className="btn btn-light px-4 rounded-pill" data-bs-dismiss="modal">Annuler</button>
                                <button className="btn btn-danger px-4 rounded-pill fw-bold" onClick={() => deleteProduct(productToDelete)}>Confirmer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;