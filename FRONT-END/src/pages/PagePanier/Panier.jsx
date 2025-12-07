import React from "react";
import { CartContext } from "../../utils/context/CartContext";
import axiosInstance from "../../utils/axios/axiosInstance";

const Panier = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

    const handleChekout = async () => {
        // IMPORTANT : On envoie seulement les IDs et quantités des produits au backend
        //Ne pas envoyer le prix ou autres données sensibles (données sensibles)

        const orderData = cartItems.map(item => ({
            id: item._id,
            quantity: item.quantity
        }));

        try {
            // await axiosInstance.post(, { products: orderData });
            alert("Commande passée avec succès !"); 
            clearCart(); // Vider le panier après une commande réussie
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="cart-container">
            <h2>Vo</h2>
        </div>
    )
}