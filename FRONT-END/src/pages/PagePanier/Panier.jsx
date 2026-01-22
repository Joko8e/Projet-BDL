import React from "react";
import { useContext} from "react";
import { PanierContext } from "../../utils/context/PanierContext";
import axiosInstance from "../../utils/axios/axiosInstance";
import URL from "../../utils/constant/url";



const Panier = () => {
    const { panier, totalPrice, incremente, decremente, priceArticleByQuantity, removeArticle, totalArticle, clearPanier } = useContext(PanierContext);

    const handleCheckout = async () => {
        // Logique pour passer la commande
        try {
            // payload sert à structurer les données de la commande
            const payload = {
                items: panier.map(item => ({
                    product: item._id,
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
        <section>
            {panier.length > 0 ?
                <>
                    <div style={styles.root}>
                        {panier.map((product, index) => (
                            <div key={ product._id || index} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
                                <h3>{product.name}</h3>
                                <p>Prix unitaire : {product.price} €</p>
                                <img src={product.photo} alt={product.name} className="img-fluid rounded shadow" style={{ maxHeight: '150px', objectFit: 'cover' }} />
                                <p>Quantité : 
                                    <button onClick={() => decremente(index)}>-</button> 
                                    {product.quantite} 
                                    <button onClick={() => incremente(index)}>+</button>
                                </p>
                                <p>Prix total pour cet article : {priceArticleByQuantity(product.price, product.quantite)} €</p>
                                <button onClick={() => removeArticle(index)} className="btn btn-warning">Supprimer cet article</button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2>Prix total du panier : {totalPrice} €</h2>
                        <button className="btn btn-warning" onClick={handleCheckout}>Passer la commande ({totalArticle()} articles)</button>
                    </div>
                </>
                :
                <>
                    <div>
                        <h2>Votre panier est vide</h2>
                    </div>
                    <div>
                        {totalPrice && (
                            <h2>Prix total du panier : {totalPrice} €</h2>
                        )}    
                    </div>
                </>}
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