import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios/axiosInstance";
import URL from "../../utils/constant/url";

const Historique = () => {
    // Logique pour afficher l'historique des commandes de l'utilisateur
    const [Order, setOrder] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllOrderByUser();
    }, []);

    const getAllOrderByUser = async () => {
        try {
            setIsLoading(true);
            const [{ data, status }] = await Promise.all ([
                axiosInstance.get(URL.GET_COMMANDE_BY_USER, { withCredentials: true }),
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

        if (isLoading) {
        return (
            <div className="text-center my-5">
                {/* Spinner Bootstrap standard */}
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
                <p className="mt-3">Chargement des produits...</p>
            </div>
        )}
    }

    return (
        <div className="container">
            <h1>Historique des commandes</h1>
            {Order.length === 0 ? (
                <p>Aucune commande passée pour le moment.</p>
            ) : (
                <ul>
                    {Order.map((order) => (
                        <li key={order._id}>
                            <h3>Commande #{order._id}</h3>
                            <p>Date : {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p>Prix total : {order.totalPrice} €</p>
                            <h4>Articles :</h4>
                            <ul>
                                {order.items.map((item) => (
                                    <li key={item.product._id}>
                                        {item.product.nom} - Quantité : {item.quantity} - Prix unitaire : {item.price} €
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Historique;