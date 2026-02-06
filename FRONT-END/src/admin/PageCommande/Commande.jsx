import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios/axiosInstance";
import URL from "../../utils/constant/url";

const Commande = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getAllOrders(); }, []);

  const getAllOrders = async () => {
    try {
      setLoading(true);
      const { data, status } = await axiosInstance.get(URL.GET_ALL_COMMANDE, { withCredentials: true });
      if (status === 200) setOrders(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axiosInstance.put(`${URL.UPDATE_COMMANDE_STATUS}/${orderId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      }
    } catch (err) {
      console.error("Erreur mise à jour", err);
    }
  };

  // Helper pour les couleurs des badges
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'en traitement': return 'bg-info-subtle text-info border-info';
      case 'expédié': return 'bg-warning-subtle text-warning border-warning';
      case 'livré': return 'bg-success-subtle text-success border-success';
      case 'annulé': return 'bg-danger-subtle text-danger border-danger';
      default: return 'bg-light text-dark';
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh" }}>
        <div className="spinner-grow text-warning" role="status"></div>
        <p className="mt-3 fw-bold text-muted text-uppercase small">Synchronisation du flux...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      {/* HEADER */}
      <div className="mb-4 px-2 d-flex justify-content-between align-items-end">
        <div>
          <h2 className="fw-bold m-0" style={{ color: "#552583" }}>Flux des Commandes</h2>
          <p className="text-muted small">Suivi logistique et facturation en temps réel</p>
        </div>
        <div className="text-end">
          <span className="badge bg-white text-dark border shadow-sm px-3 py-2 rounded-pill">
            <i className="bi bi-clock-history me-2 text-warning"></i>
            Dernière mise à jour : {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="card border-0 shadow-sm p-5 text-center" style={{ borderRadius: "20px" }}>
          <i className="bi bi-box-seam display-1 text-light mb-3"></i>
          <h4 className="text-muted">Aucune commande enregistrée</h4>
        </div>
      ) : (
        <div className="row g-4">
          {orders.map((order) => (
            <div key={order._id} className="col-12">
              <div className="card border-0 shadow-sm overflow-hidden" style={{ borderRadius: "20px" }}>
                <div className="card-header bg-white border-0 py-3 px-4">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <span className="text-muted small text-uppercase fw-bold">N° Commande</span>
                      <h5 className="mb-0 fw-bold">#{order._id.slice(-8).toUpperCase()}</h5>
                    </div>
                    <div className="col-md-4 text-center">
                      <span className={`badge border px-3 py-2 rounded-pill ${getStatusBadge(order.status)}`}>
                        <i className="bi bi-dot me-1"></i>{order.status}
                      </span>
                    </div>
                    <div className="col-md-4 text-md-end text-center mt-2 mt-md-0">
                      <span className="text-muted small d-block">Montant Total</span>
                      <span className="fs-4 fw-bold text-dark">{order.totalPrice} €</span>
                    </div>
                  </div>
                </div>

                <div className="card-body px-4 bg-light-subtle">
                  <div className="row g-3">
                    {/* Infos Client */}
                    <div className="col-lg-3 border-end">
                      <p className="mb-2 small"><i className="bi bi-person me-2"></i><strong>Client:</strong></p>
                      <div className="p-2 bg-white rounded border-start border-4 border-warning shadow-sm">
                        <div className="fw-bold small">{order.user?.nom} {order.user?.prenom}</div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>{order.user?.email}</div>
                      </div>
                      <p className="mt-3 mb-0 small text-muted">
                        Commandé le : {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Liste Articles */}
                    <div className="col-lg-6">
                      <p className="mb-2 small"><i className="bi bi-list-check me-2"></i><strong>Détails articles:</strong></p>
                      <ul className="list-group list-group-flush rounded shadow-sm">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="list-group-item d-flex justify-content-between align-items-center py-2 border-0 small">
                            <span>
                              <span className="badge bg-dark rounded-pill me-2">{item.quantity}</span>
                              {item.product?.nom || "Produit supprimé"}
                            </span>
                            <span className="fw-bold">{item.price} €</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions de Gestion */}
                    <div className="col-lg-3 text-center d-flex flex-column justify-content-center gap-2">
                      <label className="small fw-bold text-muted">Modifier l'état :</label>
                      <select
                        className="form-select form-select-sm border-0 shadow-sm py-2 rounded-pill"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        style={{ cursor: 'pointer' }}
                      >
                        <option value="En traitement">En traitement</option>
                        <option value="expédié">Expédié</option>
                        <option value="livré">Livré</option>
                        <option value="annulé">Annulé</option>
                      </select>
                      <div className="d-flex gap-1 mt-2">
                        <button className="btn btn-dark btn-sm w-100 rounded-pill small">Facture PDF</button>
                        <button
                          disabled={order.status === "annulé"}
                          className="btn btn-outline-danger btn-sm w-100 rounded-pill small"
                          onClick={() => handleStatusChange(order._id, "annulé")}
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Commande;