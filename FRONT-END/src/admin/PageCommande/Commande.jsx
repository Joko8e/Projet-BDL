import React from "react";
import axiosInstance from "../../utils/axios/axiosInstance";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import URL from "../../utils/constant/url";
import { set } from "lodash";

const Commande = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllOrders();
    }, []);

    const getAllOrders = async () => {
        try {
            setLoading(true);
            const { data, status } = await axiosInstance.get(URL.GET_ALL_COMMANDE, { withCredentials: true });
            if (status === 200) {
                setOrders(data);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p className="mt-3">Chargement des commandes...</p>
      </div>
    );
  }

    return (
        <div className="container mt-4">
      <h1 className="mb-4 fw-bold">📦 Commandes – Admin</h1>

      {orders.length === 0 ? (
        <div className="alert alert-info">
          Aucune commande pour le moment.
        </div>
      ) : (
        orders.map(order => (
          <div key={order._id} className="card mb-4 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <div>
                <strong>Commande</strong> #{order._id}
              </div>
              <span className="badge bg-success fs-6">
                {order.totalPrice} €
              </span>
            </div>

            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-4">
                  <strong>Utilisateur :</strong><br />
                  {order.user?.email || "N/A"}
                </div>

                <div className="col-md-4">
                  <strong>Date :</strong><br />
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>

                <div className="col-md-4">
                  <strong>Articles :</strong><br />
                  <span className="badge bg-primary">
                    {order.items.length}
                  </span>
                </div>
              </div>

              <table className="table table-bordered table-sm align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Produit</th>
                    <th className="text-center">Quantité</th>
                    <th className="text-center">Prix unitaire</th>
                    <th className="text-center">Total</th>
                    <th className="text-center">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map(item => (
                    <tr key={item.product._id}>
                      <td>{item.product.nom}</td>
                      <td className="text-center">
                        <span className="badge bg-info text-dark">
                          {item.quantity}
                        </span>
                      </td>
                      <td className="text-center">
                        {item.price} €
                      </td>
                      <td className="text-center fw-bold">
                        {item.price * item.quantity} €
                      </td>
                      <td className="text-center">
                        <span className="badge bg-secondary">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="d-flex justify-content-end gap-2">
                <button className="btn btn-outline-primary btn-sm">
                  Détails
                </button>
                <button className="btn btn-outline-danger btn-sm">
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
    )
}

export default Commande;
