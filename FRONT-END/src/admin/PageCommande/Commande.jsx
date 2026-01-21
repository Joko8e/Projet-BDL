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
        // <div>
        //     <h1>Liste des Commandes</h1>
        //     <div className="table-responsive">
        //         <table className="table table-striped table-bordered">
        //             <thead className="table-dark">
        //                 <tr>
        //                     <th>ID Commande</th>
        //                     <th>Client</th>
        //                     <th>Date de Commande</th>
        //                     <th>Total</th>
        //                     <th>Status</th>
        //                     <th>Actions</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {commandes.map((commande, index) => (
        //                     <tr key={commande._id}>
        //                         <td>{index}</td>
        //                         <td>{commande.client}</td>
        //                         <td>{commande.dateCommande}</td>
        //                         <td>{commande.total} €</td>
        //                         <td>{commande.status}</td>
        //                         <td>
        //                             <Link to={`/admin/commande/${commande._id}`} className="btn btn-primary btn-sm me-2">
        //                                 <i className="bi bi-eye"></i>
        //                             </Link>
        //                         </td>
        //                     </tr>
        //                 ))}
        //             </tbody>
        //         </table>
        //     </div>
        // </div>
        <div className="container">
      <h1>Historique des commandes (Admin)</h1>
      {orders.length === 0 ? (
        <p>Aucune commande pour le moment.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id} className="mb-4">
              <h3>Commande #{order._id}</h3>
              <p>Utilisateur : {order.user?.email || "N/A"}</p>
              <p>Date : {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Prix total : {order.totalPrice} €</p>
              <h4>Articles :</h4>
              <ul>
                {order.items.map(item => (
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

export default Commande;
