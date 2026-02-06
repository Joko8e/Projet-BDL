import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../utils/axios/axiosInstance";
import URL from "../../utils/constant/url";

const Historique = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { idCommande } = useParams(); // Note: Vérifie si c'est idUser ou idCommande selon ta route

    useEffect(() => {
        getAllOrderByUser();
    }, []);

    const getAllOrderByUser = async () => {
        try {
            setIsLoading(true);
            const { data, status } = await axiosInstance.get(`${URL.GET_COMMANDE_BY_USER}/${idCommande}`, { withCredentials: true });
            if (status === 200) setOrders(data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "en traitement": return { color: "#f39c12", bg: "#fef9e7", icon: "bi-clock-history" };
            case "expédié": return { color: "#3498db", bg: "#ebf5fb", icon: "bi-truck" };
            case "livré": return { color: "#27ae60", bg: "#e9f7ef", icon: "bi-check-all" };
            case "annulé": return { color: "#e74c3c", bg: "#fdedec", icon: "bi-x-circle" };
            default: return { color: "#7f8c8d", bg: "#f4f6f7", icon: "bi-box" };
        }
    };

    if (isLoading) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "60vh" }}>
                <div className="spinner-border text-warning" style={{ width: "3rem", height: "3rem" }} role="status"></div>
                <p className="mt-3 fw-bold text-muted">Récupération de vos achats...</p>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold mb-2">Mes Commandes</h1>
                <p className="text-muted">Retrouvez ici le détail et le suivi de vos achats</p>
            </div>

            {orders.length === 0 ? (
                <div className="card border-0 shadow-sm p-5 text-center" style={{ borderRadius: "20px" }}>
                    <i className="bi bi-bag-x display-1 text-light mb-3"></i>
                    <h4 className="fw-bold">Vous n'avez pas encore de commande</h4>
                    <Link to="/boutique" className="btn btn-warning mt-3 px-4 rounded-pill fw-bold">DÉCOUVRIR NOS PRODUITS</Link>
                </div>
            ) : (
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        {orders.map((order) => {
                            const style = getStatusStyle(order.status);
                            return (
                                <div key={order._id} className="card border-0 shadow-sm mb-4 overflow-hidden" style={{ borderRadius: "20px" }}>
                                    {/* BANDEAU SUPÉRIEUR */}
                                    <div className="card-header border-0 py-3 px-4 d-flex justify-content-between align-items-center"
                                        style={{ backgroundColor: style.bg }}>
                                        <div className="d-flex align-items-center">
                                            <div className="rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm"
                                                style={{ width: "40px", height: "40px", backgroundColor: "#fff", color: style.color }}>
                                                <i className={`bi ${style.icon} fs-5`}></i>
                                            </div>
                                            <div>
                                                <span className="text-muted small d-block text-uppercase fw-bold" style={{ letterSpacing: "1px" }}>Statut</span>
                                                <span className="fw-bold" style={{ color: style.color }}>{order.status}</span>
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <span className="text-muted small d-block fw-bold text-uppercase">N° de commande</span>
                                            <span className="fw-bold">#{order._id.slice(-8).toUpperCase()}</span>
                                        </div>
                                    </div>

                                    {/* CONTENU */}
                                    <div className="card-body p-4">
                                        <div className="row align-items-center">
                                            <div className="col-md-7">
                                                <div className="d-flex flex-column gap-3">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="d-flex align-items-center gap-3 p-2 rounded-3 bg-light-subtle">
                                                            {/* Mini image si dispo */}
                                                            <div className="bg-white rounded p-1 shadow-sm" style={{ width: "60px", height: "60px" }}>
                                                                <img src={item.product?.photo} className="img-fluid" alt="" />
                                                            </div>
                                                            <div>
                                                                <div className="fw-bold mb-0">{item.product?.nom}</div>
                                                                <div className="text-muted small">Qté : {item.quantity} • {item.price} € / unité</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="col-md-5 mt-4 mt-md-0 text-md-end border-start-md ps-md-5">
                                                <div className="mb-3">
                                                    <span className="text-muted small d-block">Passée le {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                                    <h3 className="fw-bold mt-1 mb-0">{order.totalPrice} €</h3>
                                                </div>
                                                <div className="d-flex gap-2 justify-content-md-end">
                                                    <button className="btn btn-outline-dark rounded-pill px-4 btn-sm fw-bold">FACTURE PDF</button>
                                                    <button className="btn btn-dark rounded-pill px-4 btn-sm fw-bold">SUIVRE COLIS</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Historique;