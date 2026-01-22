import { createContext, useEffect, useState } from "react";
import { debounce } from "lodash";

// Créer le contexte du panier
export const PanierContext = createContext();

// Fournir le contexte du panier aux composants enfants
export const PanierProvider = ({ children }) => {

  const [panier, setPanier] = useState([]); // État pour stocker les articles du panier
  const [totalPrice, setTotalPrice] = useState(0); // État pour stocker le prix total du panier, est initialisé à 0

  useEffect(() => {
    const loadPanier = async () => {
      try {
        // Récupérer le panier depuis le localStorage
        const panierJSON = await localStorage.getItem("panier");
        // Si le panier existe, le parser et le définir dans l'état
        if (panierJSON !== null) {
          const panierStorage = JSON.parse(panierJSON); // Parser le JSON pour obtenir le tableau d'articles et le définir dans l'état
          setPanier(panierStorage);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    loadPanier(); // Appeler la fonction pour charger le panier au montage du composant
  }, []);

  useEffect(() => {
    // Calculer le prix total du panier à chaque modification du panier
    let total = 0;
    panier.forEach(item => total += item.quantite * item.price); // Calculer le total du panier en fonction de la quantité et du prix de chaque article
    setTotalPrice(parseFloat(total.toFixed(2)));
  }, [panier]);

  // Fonction pour sauvegarder le panier dans le localStorage avec debounce
  const savePanierToLocalStorage = debounce((nouveauPanier) => {
    try {
      localStorage.setItem("panier", JSON.stringify(nouveauPanier));
    } catch (error) {
      console.log(error.message);
    }
  }, 1000);

  // Fonction pour obtenir le nombre total d'articles dans le panier
  const totalArticle = () => {
    let totalArticle = 0;
    panier.forEach(item => totalArticle += item.quantite);
    return totalArticle;
  }

  // Fonction pour calculer le prix d'un article en fonction de sa quantité
  const priceArticleByQuantity = (price, quantity) => {
    const result = price * quantity;
    return parseFloat(result.toFixed(2));
  }

  // Fonction pour incrémenter la quantité d'un article dans le panier
  const incremente = (index) => {
    const nouveauPanier = [...panier];
    nouveauPanier[index].quantite++;
    setPanier(nouveauPanier);
    savePanierToLocalStorage(nouveauPanier);
  }

  // Fonction pour décrémenter la quantité d'un article dans le panier
  const decremente = (index) => {
    const nouveauPanier = [...panier];
    if (nouveauPanier[index].quantite > 1) {
      nouveauPanier[index].quantite--;
      setPanier(nouveauPanier);
      savePanierToLocalStorage(nouveauPanier);
    }
  }
  
  // Fonction pour supprimer un article du panier
  const removeArticle = (index) => {
    const nouveauPanier = [...panier];
    nouveauPanier.splice(index, 1);
    setPanier(nouveauPanier);
    savePanierToLocalStorage(nouveauPanier);
  }

  // Fonction pour vider le panier
  const clearPanier = () => {
  setPanier([]);
  localStorage.removeItem("panier");
  };


  // Fonction pour ajouter un article au panier
  const addPanier = async (product) => {
    try {
      const panier = await localStorage.getItem("panier");
      let nouveauPanier = []; // Initialiser un tableau vide pour le panier

      if (panier !== null) {
        nouveauPanier = JSON.parse(panier);
        const articleFinded = nouveauPanier.find(item => item._id === product._id); // Vérifier si l'article existe déjà dans le panier

        if (articleFinded) {
          articleFinded.quantite += 1;
        } else {
          nouveauPanier.push({ ...product, quantite: 1 });
        }
      } else {
        nouveauPanier.push({ ...product, quantite: 1 });
      }

      setPanier(nouveauPanier);
      savePanierToLocalStorage(nouveauPanier);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <PanierContext.Provider value={{
      incremente, decremente, addPanier, priceArticleByQuantity, totalArticle, panier, totalPrice, removeArticle, clearPanier
    }}>
      {children}</PanierContext.Provider> 
  )

}