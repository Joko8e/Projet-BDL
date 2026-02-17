import axiosInstance from '../../utils/axios/axiosInstance';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom"; // On ajoute useNavigate

const VerifyEmail = () => {
  const [message, setMessage] = useState('');
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false); // On crée un vrai état pour le succès
  
  const navigate = useNavigate(); // Pour la redirection
  const hasCalled = useRef(false); // LE VERROU : pour empêcher le double appel

  useEffect(() => {
    const updateIsVerify = async () => {
      // Si on a déjà appelé l'API une fois, on ne fait rien
      if (hasCalled.current) return;

      if (!token) {
        setMessage('Token de vérification manquant.');
        setLoading(false);
        return;
      }

      try {
        hasCalled.current = true; // On verrouille immédiatement
        
        const { data } = await axiosInstance.put(`/api/auth/verify/${token}`);
        
        setMessage(data.message);
        setIsSuccess(true); // On marque le succès

        // Redirection automatique après 4 secondes
        setTimeout(() => {
            navigate('/sign');
        }, 4000);

      } catch (error) {
        // ANALYSE DE L'ERREUR :
        // Si le backend dit "Déjà vérifié" ou si MongoDB est déjà à true, 
        // on ne doit pas afficher un message d'erreur rouge.
        
        const errorMsg = error.response?.data?.message || "";
        
        if (errorMsg.includes("déjà vérifié") || errorMsg.includes("already verified")) {
          // Si c'est juste un problème de "déjà fait", on traite ça comme un succès
          setMessage("Votre compte est déjà vérifié !");
          setIsSuccess(true);
          setTimeout(() => { navigate('/sign'); }, 3000);
        } else {
          // Si c'est une VRAIE erreur (token expiré, mauvais token)
          setMessage(errorMsg || "Lien invalide ou expiré.");
          setIsSuccess(false);
        }
      } finally {
        setLoading(false);
      }
    };

    updateIsVerify();
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="verify-wrapper d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="verify-title">Vérification...</h1>
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      </div>
    );
  }

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
        <div className={`status-icon ${isSuccess ? 'text-success-custom' : 'text-danger-custom'}`}>
          <i className={`bi ${isSuccess ? 'bi-patch-check-fill' : 'bi-x-octagon-fill'}`}></i>
        </div>

        <h1 className="verify-title small">Vérification d'email</h1>
        
        <p className="lead mb-4 fw-medium text-muted" style={{ fontSize: '1.1rem' }}>
          {message}
        </p>

        <div className="mt-4">
          {isSuccess ? (
            <>
              <Link to="/sign" className="btn btn-custom btn-success-custom shadow-sm mb-3">
                Se connecter maintenant <i className="bi bi-arrow-right ms-2"></i>
              </Link>
              <p className="small text-muted mt-2">Redirection automatique dans quelques secondes...</p>
            </>
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

export default VerifyEmail;