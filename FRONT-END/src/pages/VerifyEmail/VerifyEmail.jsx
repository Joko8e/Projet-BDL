// On importe tout ce dont on a besoin pour faire marcher notre composant 🛠️
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
// On crée notre composant qui va gérer la vérification des emails ✉️
const VerifyEmail = () => {
  
  // On crée un état pour stocker notre message (comme une boîte à message 📫)
  const [message,setMessage] = useState('')
  // On récupère le token depuis l'URL (c'est comme une clé spéciale 🔑)
  const { token } = useParams()
  // On crée un état pour indiquer si la vérification est en cours
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // On crée une fonction qui va mettre à jour le statut de vérification
    const updateIsVerify = async () => {
      if (!token) {
        setMessage('Token de vérification manquant.');
        setLoading(false);
        return;
      }

      try {
        // On envoie une requête au serveur pour vérifier l'email
        // C'est comme envoyer une lettre et attendre la réponse 📬
        const { data } = await axios.put(`http://localhost:8000/api/auth/verify/${token}`)
        setMessage(data.message);
      } catch ({ response }) {
        const { message } = response.data
        setMessage(message);
      } finally {
        setLoading(false);
      }
    }
    updateIsVerify();
  }, [token]);

  if (loading) {
    return <div className="container mt-5 text-center">
      <h1>Vérification d'email</h1>
      <p>Vérification en cours...</p>
    </div>
  }
  
  // On détermine si la vérification a réussi ou échoué
  const isSuccess = message === 'Email vérifié avec succès !';

  

  return (
    <div className="container mt-5 text-center">
      <h1>Vérification d'email</h1>
      
      {/* Message avec style conditionnel */}
      <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'} mt-4`}>
        {message}
      </div>

      {/* Lien de connexion affiché seulement si succès */}
      {isSuccess && (
        <div className="mt-4">
          <Link to="/sign" className="btn btn-primary">
            Se connecter maintenant
          </Link>
        </div>
      )}

      {/* Lien alternatif si échec */}
      {!isSuccess && (
        <div className="mt-4">
          <Link to="/register" className="btn btn-secondary">
            Retour à l'inscription
          </Link>
        </div>
      )}
    </div>
  )
}

export default VerifyEmail