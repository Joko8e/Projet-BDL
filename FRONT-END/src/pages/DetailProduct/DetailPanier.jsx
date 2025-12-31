import axiosInstance from "../../utils/axios/axiosInstance";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import URL from "../../utils/constant/url";

const Detail = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const [product, setProduct] = useState({});

    useEffect(() => {
      // fetchproduct sert à récupérer les détails du produit en fonction de l'ID
    const fetchProduct = async () => {
      try {
        const { data, status } = await axiosInstance.get(URL.GET_PRODUIT_BY_ID + "/" + id);
        if (status === 200) setProduct(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div>
            <h1>Detail : {product.nom}</h1>
            <img src={product.photo} alt={product.titre} width={500} />
            <p>{product.category}</p>
            <p>{product.modele}</p>
            <p>{product.description}</p>
            <p>{product.prix}</p>
            <p>{product.stock}</p>
            <button className="btn btn-outline-primary m-2" onClick={() => navigate(-1)}>
                ← Retour
            </button>
            <button>Reserver</button>
    </div>
  );
};

export default Detail;