import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import URL from "../../utils/constant/url";
import axiosInstance from "../../utils/axios/axiosInstance.js";
import { PRODUCT_FIELDS } from "../../utils/config/FormFiedls.js";

const UpdateProduct = () => {
    const { idProduct } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [product, setProduct] = useState({
        id_marque: "",
        nom: "",
        category: "",
        attributes: { color: "", size: [], weight: "", pied: "" },
        modele: "",
        photo: "",
        description: "",
        stock: "",
        price: ""
    });

    const [allMarque, setAllMarque] = useState([]);

    useEffect(() => {
        getProductById();
        getAllMarque();
    }, [idProduct]);

    const getProductById = async () => {
        try {
            const { data, status } = await axiosInstance.get(`${URL.GET_PRODUIT_BY_ID}/${idProduct}`);
            if (status === 200) {
                setProduct({
                    ...data,
                    attributes: {
                        color: data.attributes?.color || "",
                        size: data.attributes?.size || [],
                        weight: data.attributes?.weight || "",
                        pied: data.attributes?.pied || ""
                    }
                });
            }
        } catch (error) {
            console.error("Erreur chargement produit:", error);
        }
    };

    const getAllMarque = async () => {
        try {
            const { data, status } = await axiosInstance.get(URL.GET_ALL_MARQUE);
            if (status === 200) setAllMarque(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        // Correction ici : on vérifie les noms exacts définis dans PRODUCT_FIELDS
        if (["color", "weight", "pied"].includes(name)) {
            setProduct(prev => ({
                ...prev,
                attributes: { ...prev.attributes, [name]: value }
            }));
        } else {
            setProduct(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSizeChange = (size) => {
        setProduct(prev => {
            const currentSizes = prev.attributes.size || [];
            const newSizes = currentSizes.includes(size)
                ? currentSizes.filter(s => s !== size)
                : [...currentSizes, size];
            return {
                ...prev,
                attributes: { ...prev.attributes, size: newSizes }
            };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const { status } = await axiosInstance.put(`${URL.UPDATE_PRODUIT}/${idProduct}`, product);
            if (status === 200) {
                alert("Mise à jour réussie ! ✨");
                navigate('/dashboard/product'); // Ou redirection de ton choix
            }
        } catch (error) {
            alert("Erreur lors de la mise à jour");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <style>
                {`
                    .admin-card { border-radius: 20px; border: none; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
                    .form-label { color: #552583; font-size: 0.85rem; letter-spacing: 0.5px; }
                    .form-control, .form-select { border-radius: 10px; padding: 10px 15px; border: 1px solid #eee; background-color: #f8f9fa; }
                    .form-control:focus { border-color: #552583; box-shadow: none; background-color: #fff; }
                    .size-badge { cursor: pointer; border: 1px solid #dee2e6; border-radius: 8px; padding: 5px 10px; transition: all 0.2s; user-select: none; }
                    .size-badge.active { background-color: #552583; color: #FDB927; border-color: #552583; }
                    .btn-update { background-color: #552583; color: #FDB927; border-radius: 12px; padding: 12px; font-weight: bold; border: none; transition: 0.3s; }
                    .btn-update:hover { background-color: #2a1242; transform: translateY(-2px); color: #FDB927; }
                `}
            </style>

            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card admin-card p-4 p-md-5">
                        <div className="d-flex align-items-center mb-4">
                            <button onClick={() => navigate(-1)} className="btn btn-sm btn-outline-secondary rounded-pill me-3">
                                <i className="bi bi-arrow-left"></i>
                            </button>
                            <h2 className="fw-bold m-0" style={{ color: "#552583" }}>Modifier le Produit</h2>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row g-4">
                                {PRODUCT_FIELDS.map((field, index) => (
                                    <div key={index} className={field.type === "checkbox-group" ? "col-12" : "col-md-6"}>
                                        <label className="form-label fw-bold text-uppercase" htmlFor={field.id}>
                                            {field.label}
                                        </label>

                                        {field.type === "select" ? (
                                            <select className="form-select shadow-sm" name={field.name} id={field.id} value={product[field.name] || ""} onChange={handleChange}>
                                                <option value="">{field.placeholder}</option>
                                                {/* On peut boucler sur allMarque si le champ est id_marque */}
                                                {field.name === "id_marque" ?
                                                    allMarque.map(m => <option key={m._id} value={m._id}>{m.nom}</option>) :
                                                    <>
                                                        <option value={field.option1}>{field.option1}</option>
                                                        <option value={field.option2}>{field.option2}</option>
                                                        <option value={field.option3}>{field.option3}</option>
                                                    </>
                                                }
                                            </select>
                                        ) : field.type === "checkbox-group" ? (
                                            <div className="bg-light p-3 rounded-3 shadow-sm border">
                                                <div className="d-flex flex-wrap gap-2">
                                                    {[36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50].map(size => (
                                                        <div key={size} onClick={() => handleSizeChange(size)}
                                                            className={`size-badge fw-bold ${product.attributes?.size?.includes(size) ? 'active' : ''}`}>
                                                            {size}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <input className="form-control shadow-sm"
                                                type={field.type}
                                                name={field.name}
                                                id={field.id}
                                                placeholder={field.placeholder}
                                                value={
                                                    ["color", "weight", "pied"].includes(field.name)
                                                        ? product.attributes?.[field.name] || ""
                                                        : product[field.name] || ""
                                                }
                                                onChange={handleChange} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 d-grid">
                                <button type="submit" className="btn btn-update btn-lg shadow" disabled={loading}>
                                    {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-cloud-upload me-2"></i>}
                                    ENREGISTRER LES MODIFICATIONS
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;