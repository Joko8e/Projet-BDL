import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import URL from "../../utils/constant/url";
import axiosInstance from "../../utils/axios/axiosInstance.js";

import { PanierContext } from "../../utils/context/PanierContext.jsx";

const Detail = () => {
    const { addPanier } = useContext(PanierContext);
    const [selectSize, setSelectSize] = useState(null);

    const params = useParams();
    const { idProduct } = params;
    const [product, setProduct] = useState([])

    useEffect(() => {
        getProductById()
    }, [])
    const getProductById = async () => {
        try {
            const { data, status } = await axiosInstance.get(URL.GET_PRODUIT_BY_ID + '/' + idProduct)
            if (status === 200) setProduct(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="container my-5">
            <div className="row g-4">
                
                <div className="col-12 col-md-6 text-center">
                    <img 
                        src={product.photo} 
                        alt={product.nom} 
                        className="img-fluid rounded shadow" 
                        style={{ maxHeight: '450px', objectFit: 'cover' }}
                    />
                </div>
                
                <div className="col-12 col-md-6">
                    <h1 className="display-4 mb-2">{product.nom}</h1>
                    <h2 className="text-muted lead mb-4">{product.modele}</h2>
                    
                    <hr />

                    <p className="fs-5 mb-4">{product.description}</p>
                    
                    {/* Prix mis en évidence */}
                    <div className="d-flex align-items-center mb-4">
                        <span className="text-success fw-bold me-3 fs-3">
                            {product.price} €
                        </span>
                        <span className="badge bg-info text-dark">En stock</span>
                    </div>

                    <div className="mb-4">
                        <div className="mb-4">
                            <h5>Taille</h5>
                            <div className="d-flex flex-wrap gap-2">
                                {product.attributes?.size?.map((size) => (
                                <button
                                    key={size}
                                    className={`btn ${
                                    selectSize === size ? "btn-dark" : "btn-outline-dark"
                                    }`}
                                    onClick={() => setSelectSize(size)}
                                >
                                    {size}
                                </button>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* Bouton d'action */}
                    <p
                        className="btn btn-warning btn-lg shadow-sm w-100"
                        disabled={!selectSize}
                        onClick={() => addPanier({ product, size: selectSize })}
                    >
                        { selectSize ? "Ajouter au panier" : "Sélectionner une taille" }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Detail