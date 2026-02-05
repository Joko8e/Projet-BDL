import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios/axiosInstance";
import URL from "../../utils/constant/url";

const Historique = () => {
    // Logique pour afficher l'historique des commandes de l'utilisateur
    const [Order, setOrder] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {idCommande} = useParams();

    useEffect(() => {
        getAllOrderByUser();
    }, []);

    const getAllOrderByUser = async () => {
        try {
            setIsLoading(true);
            const [{ data, status }] = await Promise.all([
                axiosInstance.get(URL.GET_COMMANDE_BY_USER + '/' + idCommande, { withCredentials: true }),
                new Promise((resolve) => setTimeout(resolve, 250))
            ])
            if (status === 200) {
                setOrder(data)
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return (
            <div className="text-center my-5">
                {/* Spinner Bootstrap standard */}
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
                <p className="mt-3">Chargement des produits...</p>
            </div>
        )
    }


    const getStatusBadge = (status) => {
        switch (status) {
            case "En traitement":
                return <span className="badge bg-warning text-dark">En traitement</span>
            case "expédié":
                return <span className="badge bg-primary">Expédiée</span>
            case "livré":
                return <span className="badge bg-success">Livrée</span>
            case "annulé":
                return <span className="badge bg-danger">Annulée</span>
            default:
                return <span className="badge bg-secondary">En traitement</span>
        }
    }


    return (
        <div className="container my-5">
            <h1 className="mb-4 text-center">Historique des commandes</h1>

            {Order.length === 0 ? (
                <div className="alert alert-info text-center">
                    Aucune commande passée pour le moment.
                </div>
            ) : (
                <div className="row">
                    {Order.map((order) => (
                        <div className="col-12 mb-4" key={order._id}>
                            <div className="card shadow-sm">

                                {/* HEADER */}
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div>
                                        <span className="fw-bold">
                                            Commande #{order._id}
                                        </span>
                                        <div className="text-muted small">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    {/* STATUT */}
                                    {getStatusBadge(order.status)}
                                </div>

                                {/* BODY */}
                                <div className="card-body">
                                    <p className="mb-3">
                                        <strong>Prix total :</strong>{" "}
                                        <span className="text-success fw-bold">
                                            {order.totalPrice} €
                                        </span>
                                    </p>

                                    <h5 className="mb-3">Articles</h5>

                                    <ul className="list-group">
                                        {order.items.map((item) => (
                                            <li
                                                key={item.product._id}
                                                className="list-group-item d-flex justify-content-between align-items-center"
                                            >
                                                <div>
                                                    <div className="fw-semibold">
                                                        {item.product.nom}
                                                    </div>
                                                    <small className="text-muted">
                                                        Prix unitaire : {item.price} €
                                                    </small>
                                                </div>

                                                <span className="badge bg-primary rounded-pill">
                                                    x{item.quantity}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Historique;