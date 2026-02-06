import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import URL from "../../utils/constant/url";
import axiosInstance from "../../utils/axios/axiosInstance.js";
import { PanierContext } from "../../utils/context/PanierContext.jsx";

const Detail = () => {
    const { addPanier } = useContext(PanierContext);
    const [selectSize, setSelectSize] = useState(null);
    const [product, setProduct] = useState(null);
    const { idProduct } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductById();
    }, [idProduct]);

    const getProductById = async () => {
        try {
            const { data, status } = await axiosInstance.get(`${URL.GET_PRODUIT_BY_ID}/${idProduct}`);
            if (status === 200) setProduct(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    if (!product) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
            <div className="spinner-border text-warning" role="status"></div>
        </div>
    );

    return (
        <div className="container py-5">
            {/* Fil d'ariane / Retour */}
            <button className="btn btn-link text-decoration-none text-muted mb-4 p-0 shadow-none" onClick={() => navigate(-1)}>
                <i className="bi bi-arrow-left me-2"></i>Retour à la boutique
            </button>

            <div className="row g-5">
                {/* SECTION IMAGE AVEC EFFET DE CADRE */}
                <div className="col-lg-7">
                    <div className="card border-0 shadow-sm p-3" style={{ borderRadius: "30px", backgroundColor: "#f8f9fa" }}>
                        <img 
                            src={product.photo} 
                            alt={product.nom} 
                            className="img-fluid" 
                            style={{ 
                                borderRadius: "20px", 
                                width: "100%", 
                                maxHeight: "600px", 
                                objectFit: "contain",
                                mixBlendMode: "multiply" // Super pour les fonds blancs de chaussures
                            }}
                        />
                    </div>
                </div>
                
                {/* SECTION INFOS PRODUIT */}
                <div className="col-lg-5">
                    <div className="ps-lg-4">
                        <span className="badge bg-warning text-dark mb-2 px-3 py-2 rounded-pill fw-bold">NOUVEAUTÉ</span>
                        <h1 className="fw-bold display-5 mb-1" style={{ color: "#2d2d2d" }}>{product.nom}</h1>
                        <p className="text-muted fs-5 mb-4">{product.modele}</p>
                        
                        <div className="d-flex align-items-center gap-3 mb-4">
                            <h2 className="fw-bold m-0" style={{ color: "#552583", fontSize: "2.5rem" }}>
                                {product.price} €
                            </h2>
                            <span className="text-success small fw-bold">
                                <i className="bi bi-check2-circle me-1"></i>En stock, prêt à être expédié
                            </span>
                        </div>

                        <hr className="my-4 opacity-10" />

                        <h6 className="fw-bold text-uppercase small text-muted mb-3">Description</h6>
                        <p className="text-secondary lh-lg mb-4">
                            {product.description || "Ce modèle iconique combine un design audacieux avec un confort exceptionnel, parfait pour affirmer votre style au quotidien."}
                        </p>

                        {/* SÉLECTEUR DE TAILLE STYLE "GRID" */}
                        <div className="mb-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 className="fw-bold text-uppercase small text-muted m-0">Sélectionner la Taille</h6>
                                <button className="btn btn-link btn-sm text-dark text-decoration-underline p-0 shadow-none">Guide des tailles</button>
                            </div>
                            <div className="row row-cols-4 g-2">
                                {product.attributes?.size?.map((size) => (
                                    <div className="col" key={size}>
                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="v-size"
                                            id={`size-${size}`}
                                            autoComplete="off"
                                            checked={selectSize === size}
                                            onChange={() => setSelectSize(size)}
                                        />
                                        <label 
                                            className={`btn w-100 py-2 fw-bold border-2 ${selectSize === size ? 'btn-dark' : 'btn-outline-dark'}`} 
                                            htmlFor={`size-${size}`}
                                            style={{ borderRadius: "10px", fontSize: "0.9rem" }}
                                        >
                                            {size}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* BOUTON PANIER XL */}
                        <button
                            className="btn btn-warning btn-lg w-100 py-3 fw-bold shadow mb-3"
                            style={{ borderRadius: "15px", transition: "all 0.3s ease" }}
                            disabled={!selectSize}
                            onClick={() => addPanier({ product: product, size: selectSize })}
                        >
                            <i className="bi bi-bag-plus-fill me-2"></i>
                            { selectSize ? "AJOUTER AU PANIER" : "CHOISISSEZ UNE TAILLE" }
                        </button>

                        {/* PETITS ARGUMENTS DE VENTE */}
                        <div className="row g-2 mt-2">
                            <div className="col-6">
                                <div className="p-2 border rounded-3 text-center small">
                                    <i className="bi bi-truck me-2 text-warning"></i>Livraison 48h
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="p-2 border rounded-3 text-center small">
                                    <i className="bi bi-arrow-repeat me-2 text-warning"></i>Retours gratuits
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;