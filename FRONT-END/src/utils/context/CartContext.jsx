import { createContext, useEffect, useState } from "react";

// Créer le contexte du panier
export const CartContext = createContext()

// Hook personnalisé pour utiliser le contexte du panier
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé dans CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
    // État pour stocker les articles du panier
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("shopping-cart");
        return savedCart ? JSON.parse(savedCart) : [];
    }) 

    // Sauvegarder le panier dans le localStorage à chaque modification
    useEffect(() => {
        localStorage.setItem("shopping-cart", JSON.stringify(cartItems))
    }, [cartItems])

    // FONCTION : Ajouter un produit au panier
   const addToCart = (product, size) => {
    setCartItems(prevCartItems => {
      // Vérifier si ce produit avec cette taille existe déjà
      const existingItem = prevCartItems.find(
        item => item.id === product.id && item.size === size
      );
      
      if (existingItem) {
        return prevCartItems.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCartItems, { ...product, size, quantity: 1 }];
    });
  };


    // FONCTION : Retirer un produit
  const removeFromCart = (productId, size) => {
    setCartItems(prevCartItems =>
      prevCartItems.filter(item => !(item.id === productId && item.size === size)));
  };

  // FONCTION : Modifier la quantité (+/-)
  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // FONCTION : Vider le panier (après commande réussie)
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("shopping-cart");
  };

  // CALCUL : Total du panier (pour l'affichage)
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  )
}