import React from "react";
import axiosInstance from "../../utils/axios/axiosInstance";
import { useState, useEffect } from "react";
import URL from "../../utils/constant/url";

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
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axiosInstance.put(URL.UPDATE_COMMANDE_STATUS + '/' + orderId,
        { status: newStatus },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Mise à jour de ton state local "Order" pour rafraîchir l'affichage
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      }
      alert("Statut mis à jour avec succès");
    } catch (err) {
      console.error("Erreur lors de l'annulation", err);
    }
  };

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
      <div className="alert alert-info">Aucune commande pour le moment.</div>
    ) : (
      orders.map((order) => (
        <div key={order._id} className="card mb-4 shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center bg-light">
            <div>
              <strong>Commande</strong> #{order._id}
            </div>
            <span className="badge bg-success fs-6">{order.totalPrice} €</span>
          </div>

          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-3">
                <strong>Utilisateur :</strong><br />
                {order.user?.email || "N/A"}
              </div>

              <div className="col-md-3">
                <strong>Date :</strong><br />
                {new Date(order.createdAt).toLocaleDateString()}
              </div>

              <div className="col-md-3">
                <strong>Articles :</strong><br />
                <span className="badge bg-primary">{order.items.length}</span>
              </div>

              {/* ACTION : Changement de Statut */}
              <div className="col-md-3">
                <strong>Statut (Modifier) :</strong><br />
                <select 
                  className="form-select form-select-sm mt-1"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="En traitement">En traitement</option>
                  <option value="expédié">Expédié</option>
                  <option value="livré">Livré</option>
                  <option value="annulé">Annulé</option>
                </select>
              </div>
            </div>

            <table className="table table-bordered table-sm align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Produit</th>
                  <th className="text-center">Quantité</th>
                  <th className="text-center">Prix unitaire</th>
                  <th className="text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.product?._id || Math.random()}>
                    <td>{item.product?.nom || "Produit supprimé"}</td>
                    <td className="text-center">
                      <span className="badge bg-info text-dark">{item.quantity}</span>
                    </td>
                    <td className="text-center">{item.price} €</td>
                    <td className="text-center fw-bold">{item.price * item.quantity} €</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center border-top pt-2">
              <div>
                <span className={`badge ${order.status === 'annulé' ? 'bg-danger' : 'bg-secondary'}`}>
                  Statut actuel : {order.status}
                </span>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-primary btn-sm">Détails</button>
                <button 
                   className="btn btn-outline-danger btn-sm"
                   onClick={() => handleStatusChange(order._id, "annulé")}
                >
                  Annuler la commande
                </button>
              </div>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
);
}

export default Commande;
