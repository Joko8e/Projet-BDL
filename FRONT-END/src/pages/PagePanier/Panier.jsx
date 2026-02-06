import React from "react";
import { useContext } from "react";
import { PanierContext } from "../../utils/context/PanierContext";
import axiosInstance from "../../utils/axios/axiosInstance";
import URL from "../../utils/constant/url";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



const Panier = () => {
    const { panier, totalPrice, incremente, decremente, priceArticleByQuantity, removeArticle, totalArticle, clearPanier } = useContext(PanierContext);

    const navigate = useNavigate();
    const handleCheckout = async () => {
        // Logique pour passer la commande
        try {
            // payload sert à structurer les données de la commande
            const payload = {
                items: panier.map(item => ({
                    product: item.product._id,
                    quantity: item.quantite,
                })),
            };

            const response = await axiosInstance.post(URL.POST_COMMANDE, payload, { withCredentials: true });
            console.log("Commande passée avec succès :", response.data);
            // Vider le panier après une commande réussie
            clearPanier();
            alert("Commande passée avec succès !");
            // On redirige vers une page de confirmation ou d'historique des commandes si nécessaire
            navigate("/historique");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <section className="container py-5" style={{ minHeight: '80vh' }}>
            <h1 className="text-center mb-5 fw-bold" style={{ color: "#552583" }}>MON PANIER</h1>

            {panier.length > 0 ? (
                <div className="row g-4">
                    {/* LISTE DES ARTICLES (Gauche) */}
                    <div className="col-lg-8">
                        {panier.map((item, index) => (
                            <div key={item._id || index} className="card mb-3 shadow-sm border-0">
                                <div className="card-body">
                                    <div className="row align-items-center text-center text-md-start">
                                        {/* Image */}
                                        <div className="col-md-2 mb-3 mb-md-0">
                                            <img src={item.product?.photo} alt={item.product?.nom} className="img-fluid rounded" style={{ height: '80px', objectFit: 'cover' }} />
                                        </div>

                                        {/* Détails */}
                                        <div className="col-md-4">
                                            <h5 className="mb-1">{item.product?.nom}</h5>
                                            <p className="text-muted small mb-0">Taille : <span className="badge bg-light text-dark">{item.size}</span></p>
                                        </div>

                                        {/* Quantité */}
                                        <div className="col-md-3 my-3 my-md-0">
                                            <div className="d-flex justify-content-center justify-content-md-start align-items-center">
                                                <button className="btn btn-sm btn-outline-secondary px-2" onClick={() => decremente(index)}>-</button>
                                                <span className="mx-3 fw-bold">{item.quantite}</span>
                                                <button className="btn btn-sm btn-outline-secondary px-2" onClick={() => incremente(index)}>+</button>
                                            </div>
                                        </div>

                                        {/* Prix & Poubelle */}
                                        <div className="col-md-3 d-flex flex-column align-items-center align-items-md-end">
                                            <span className="fw-bold mb-2">{priceArticleByQuantity(item.product?.price, item.quantite)} €</span>
                                            <button onClick={() => removeArticle(index)} className="btn btn-link text-danger p-0" title="Supprimer">
                                                <i className="fas fa-trash-alt"></i> Supprimer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RÉCAPITULATIF (Droite) */}
                    <div className="col-lg-4">
                        <div className="card shadow border-0" style={{ backgroundColor: "#f8f9fa" }}>
                            <div className="card-body">
                                <h4 className="card-title mb-4 fw-bold">Résumé</h4>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Articles ({totalArticle()})</span>
                                    <span>{totalPrice} €</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <span>Livraison</span>
                                    <span className="text-success">Gratuite</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-4 h5 fw-bold">
                                    <span>Total</span>
                                    <span style={{ color: "#552583" }}>{totalPrice} €</span>
                                </div>
                                <button className="btn w-100 py-3 fw-bold"
                                    onClick={handleCheckout}
                                    style={{ backgroundColor: "#552583", color: "#FDB927" }}>
                                    COMMANDER
                                </button>
                                <Link to="/" className="btn btn-link w-100 mt-2 text-decoration-none" style={{ color: "#552583" }}>
                                    Continuer mes achats
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-5">
                    <i className="fas fa-shopping-basket fa-4x mb-4" style={{ color: "#dee2e6" }}></i>
                    <h2 className="text-muted">Votre panier est vide</h2>
                    <Link to="/" className="btn mt-3 px-5 py-2" style={{ backgroundColor: "#552583", color: "#FDB927" }}>
                        Retour à la boutique
                    </Link>
                </div>
            )}
        </section>
    )
}

const styles = {
    root: {
        display: 'flex',
    },
    quantity: {
        display: 'flex',
        justifyContent: 'center',
    },
    title: {
        fontSize: '0.7em'
    },
    click: {
        cursor: 'pointer',
    }
};

export default Panier;