import React from "react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PanierContext } from "../../utils/context/PanierContext";



const Panier = () => {
    const { panier, totalPrice, incremente, decremente, priceArticleByQuantity, removeArticle, totalArticle } = useContext(PanierContext);

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
                        <button className="btn btn-warning">Passer la commande ({totalArticle()} articles)</button>
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