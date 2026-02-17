import axiosInstance from '../../utils/axios/axiosInstance';
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
        const { data } = await axiosInstance.put(`/auth/verify/${token}`)
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
  <div className="verify-wrapper d-flex align-items-center justify-content-center">
    <style>
      {`
        .verify-wrapper {
          min-height: 80vh;
          background-color: #f8f9fa;
        }
        .verify-card {
          background: white;
          padding: 3rem;
          border-radius: 30px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.05);
          max-width: 500px;
          width: 90%;
        }
        .status-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
        }
        .text-success-custom { color: #27ae60; }
        .text-danger-custom { color: #e74c3c; }
        
        .verify-title {
          font-weight: 800;
          color: #552583;
          text-transform: uppercase;
          letter-spacing: -1px;
          margin-bottom: 1rem;
        }
        .btn-custom {
          padding: 12px 30px;
          border-radius: 50px;
          font-weight: 700;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
        }
        .btn-success-custom {
          background-color: #552583;
          color: #FDB927;
          border: none;
        }
        .btn-success-custom:hover {
          background-color: #2a1242;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(85, 37, 131, 0.3);
          color: #FDB927;
        }
        .btn-error-custom {
          background-color: #f4f6f7;
          color: #7f8c8d;
          border: none;
        }
        .btn-error-custom:hover {
          background-color: #e5e8e8;
          color: #2c3e50;
        }
      `}
    </style>

    <div className="verify-card text-center animate__animated animate__fadeIn">
      {/* Icône Dynamique */}
      <div className={`status-icon ${isSuccess ? 'text-success-custom' : 'text-danger-custom'}`}>
        <i className={`bi ${isSuccess ? 'bi-patch-check-fill' : 'bi-x-octagon-fill'}`}></i>
      </div>

      <h1 className="verify-title small">Vérification d'email</h1>
      
      <p className="lead mb-4 fw-medium text-muted" style={{ fontSize: '1.1rem' }}>
        {message}
      </p>

      {/* Boutons Conditionnels */}
      <div className="mt-4">
        {isSuccess ? (
          <Link to="/sign" className="btn btn-custom btn-success-custom shadow-sm">
            Se connecter maintenant <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        ) : (
          <Link to="/register" className="btn btn-custom btn-error-custom shadow-sm">
            <i className="bi bi-arrow-left me-2"></i> Retour à l'inscription
          </Link>
        )}
      </div>
      
      <div className="mt-5">
        <div className="mx-auto" style={{ height: "3px", width: "30px", backgroundColor: "#FDB927", opacity: "0.5" }}></div>
      </div>
    </div>
  </div>
);
}

export default VerifyEmail