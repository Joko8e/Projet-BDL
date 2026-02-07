import React from "react";
import { Link } from "react-router-dom";

const Nothing = () => {
    return (
        <div className="error-container d-flex align-items-center justify-content-center text-center">
            <style>
                {`
                    .error-container {
                        min-height: 90vh;
                        background-color: #f8f9fa;
                        padding: 20px;
                    }
                    .error-content {
                        max-width: 600px;
                    }
                    .error-code {
                        font-size: 8rem;
                        font-weight: 900;
                        line-height: 1;
                        color: #552583; /* Ton Violet */
                        margin-bottom: 0;
                        position: relative;
                        display: inline-block;
                    }
                    .error-badge {
                        background-color: #FDB927; /* Ton Jaune */
                        color: #552583;
                        font-size: 1.2rem;
                        padding: 5px 15px;
                        font-weight: 800;
                        border-radius: 50px;
                        position: absolute;
                        top: 20%;
                        right: -20px;
                        transform: rotate(15deg);
                        box-shadow: 4px 4px 0px #552583;
                    }
                    .error-title {
                        font-weight: 800;
                        text-transform: uppercase;
                        margin-top: 1.5rem;
                        letter-spacing: -1px;
                    }
                    .error-text {
                        color: #6c757d;
                        margin-bottom: 2rem;
                        font-size: 1.1rem;
                    }
                    .btn-home {
                        background-color: #552583;
                        color: #FDB927;
                        padding: 15px 40px;
                        border-radius: 50px;
                        font-weight: 800;
                        text-decoration: none;
                        transition: all 0.3s ease;
                        display: inline-block;
                        border: 2px solid #552583;
                    }
                    .btn-home:hover {
                        background-color: transparent;
                        color: #552583;
                        transform: translateY(-5px);
                    }

                    @media (max-width: 576px) {
                        .error-code { font-size: 5rem; }
                        .error-badge { font-size: 0.9rem; right: -10px; }
                    }
                `}
            </style>

            <div className="error-content animate__animated animate__zoomIn">
                <div className="position-relative d-inline-block">
                    <h1 className="error-code">404</h1>
                    <span className="error-badge">AIRBALL !</span>
                </div>
                
                <h2 className="error-title h1">Rien sur le terrain... 🥲</h2>
                <p className="error-text">
                    On dirait que cette page est sortie des limites du terrain. 
                    Pas d'inquiétude, la partie continue !
                </p>
                
                <Link to='/' className="btn-home">
                    RETOURNER AU SHOOT <i className="bi bi-basketball ms-2"></i>
                </Link>
            </div>
        </div>
    );
}

export default Nothing;