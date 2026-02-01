import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import URL from "../../utils/constant/url";
import axiosInstance from "../../utils/axios/axiosInstance.js";

const DetailProduct = () => {

    const params = useParams();
    const { idProduct } = params;

    const [product, setProduct] = useState([])
    
    useEffect(() => {
        getProductById()
    }, [])

    const getProductById = async () => {
        try {
            const { data, status } = await axiosInstance.get(URL.GET_PRODUIT_BY_ID + '/' + idProduct)
            if(status === 200) setProduct(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="container mt-4">
      <div className="card shadow-lg border-0">
        <div className="row g-0">
          {/* Image */}
          <div className="col-md-5 text-center p-4">
            <img
              src={product.photo}
              alt={product.nom}
              className="img-fluid rounded"
              style={{ maxHeight: "350px", objectFit: "contain" }}
            />
          </div>

          {/* Infos */}
          <div className="col-md-7">
            <div className="card-body">
              <h3 className="card-title fw-bold">{product.nom}</h3>

              <div className="mb-3">
                <span className="badge bg-primary me-2">
                  {product.category}
                </span>
                <span className="badge bg-secondary">
                  Modèle : {product.modele}
                </span>
              </div>

              <p className="text-muted">{product.description}</p>

              <table className="table table-sm table-bordered mt-3">
                <tbody>
                  <tr>
                    <th>Marque</th>
                    <td>{product.id_marque?.nom || "-"}</td>
                  </tr>

                  <tr>
                    <th>Couleur</th>
                    <td>{product.attributes?.color || "-"}</td>
                  </tr>

                  <tr>
                    <th>Type de pied</th>
                    <td>
                      <span className="badge bg-info text-dark">
                        {product.attributes?.pied || "-"}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <th>Pointures</th>
                    <td>
                      {product.attributes?.size?.length > 0
                        ? product.attributes.size.join(" / ")
                        : "-"}
                    </td>
                  </tr>

                  <tr>
                    <th>Stock</th>
                    <td>
                      <span
                        className={`badge ${
                          product.stock > 0
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <th>Prix</th>
                    <td className="fw-bold text-success">
                      {product.price} €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default DetailProduct