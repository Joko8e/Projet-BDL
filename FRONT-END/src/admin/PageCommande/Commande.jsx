import React from "react";
import axiosInstance from "../../utils/axios/axiosInstance";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import URL from "../../utils/constant/url";

const Commande = () => {
    const [commandes, setCommandes] = useState([]);

    return (
        <div>
            <h1>Liste des Commandes</h1>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID Commande</th>
                            <th>Client</th>
                            <th>Date de Commande</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commandes.map((commande, index) => (
                            <tr key={commande._id}>
                                <td>{index}</td>
                                <td>{commande.client}</td>
                                <td>{commande.dateCommande}</td>
                                <td>{commande.total} €</td>
                                <td>{commande.status}</td>
                                <td>
                                    <Link to={`/admin/commande/${commande._id}`} className="btn btn-primary btn-sm me-2">
                                        <i className="bi bi-eye"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Commande;
