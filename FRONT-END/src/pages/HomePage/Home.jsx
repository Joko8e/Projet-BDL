import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import URL from '../../utils/constant/url';
import axiosInstance from '../../utils/axios/axiosInstance.js';
import { animate, createScope, splitText, stagger } from 'animejs';

const Home = () => {
    const [allProduct, setAllProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const root = useRef(null);

    useEffect(() => {
        getAllProduct();
    }, []);

    // Animation du titre
    useEffect(() => {
        // On vérifie que root.current existe bien avant de lancer l'anime
        if (!root.current) return;

        const scopeInstance = createScope({ root: root.current }).add(self => {
            const { words } = splitText('h1', { words: { wrap: 'clip' } });
            
            animate(words, {
                y: [{ to: ['100%', '0%'] }, { to: '-100%', delay: 1500, ease: 'in(3)' }],
                duration: 1500,
                ease: 'out(3)',
                delay: stagger(100),
                loop: true,
            });
        });

        return () => scopeInstance.revert();
    }, [loading]); // On ajoute loading ici pour relancer l'anime quand le spinner disparaît

    const getAllProduct = async () => {
        try {
            setLoading(true);
            const [{ data, status }] = await Promise.all([
                axiosInstance.get(URL.GET_ALL_PRODUIT),
                new Promise((resolve) => setTimeout(resolve, 800))
            ]);
            if (status === 200) setAllProduct(data);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-grow text-warning" style={{width: "3rem", height: "3rem"}} role="status"></div>
                <h5 className="mt-4 fw-bold text-uppercase" style={{letterSpacing: "3px", color: "#552583"}}>Préchauffage...</h5>
            </div>
        );
    }

    return (
        <div ref={root} className="pb-5 bg-white">
            <style>
                {`
                    .hero-section {
                        background: linear-gradient(135deg, #552583 0%, #2a1242 100%);
                        min-height: 60vh;
                        display: flex;
                        align-items: center;
                        border-radius: 0 0 50px 50px;
                        margin-bottom: 5rem;
                    }
                    .product-card {
                        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        border-radius: 25px !important;
                        overflow: hidden;
                    }
                    .product-card:hover {
                        transform: scale(1.03);
                        box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
                    }
                    .img-container {
                        background-color: #f8f9fa;
                        overflow: hidden;
                        height: 320px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .btn-shop {
                        background-color: #FDB927;
                        color: #552583;
                        font-weight: 800;
                        border-radius: 50px;
                        padding: 12px 30px;
                        transition: all 0.3s ease;
                    }
                    .btn-shop:hover {
                        background-color: #552583;
                        color: #FDB927;
                        transform: scale(1.05);
                    }
                `}
            </style>

            {/* HERO SECTION IMMERSIVE */}
            <div className="hero-section text-white shadow-lg">
                <div className="container text-center">
                    <div className="overflow-hidden mb-3">
                        <h1 className="display-1 fw-black m-0" style={{ letterSpacing: "-2px" }}>
                            BALL DON'T LIE
                        </h1>
                    </div>
                    <p className="lead opacity-75 mx-auto mb-5" style={{ maxWidth: '600px' }}>
                        Équipements de haute performance pour ceux qui ne laissent pas de place au hasard sur le terrain.
                    </p>
                    <a href="#shop" className="btn btn-shop shadow">
                        VOIR LA COLLECTION <i className="bi bi-arrow-down ms-2"></i>
                    </a>
                </div>
            </div>

            {/* GRILLE DE PRODUITS */}
            <div className="container" id="shop">
                <div className="d-flex justify-content-between align-items-end mb-5">
                    <div>
                        <h2 className="fw-bold mb-0">Dernières Sorties</h2>
                        <div className="bg-warning rounded" style={{ height: "4px", width: "60px" }}></div>
                    </div>
                    <div className="text-muted small fw-bold">PRODUITS : {allProduct.length}</div>
                </div>

                {allProduct.length === 0 ? (
                    <div className="alert border-0 shadow-sm text-center py-5 rounded-4">
                        <i className="bi bi-search display-4 text-muted mb-3 d-block"></i>
                        <h4 className="text-muted">Aucun modèle n'est disponible pour le moment.</h4>
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5">
                        {allProduct.map(item => (
                            <div key={item._id} className="col">
                                <Link to={`detail/${item._id}`} className="text-decoration-none text-dark">
                                    <div className="card h-100 border-0 shadow-sm product-card">
                                        <div className="img-container p-4">
                                            <img
                                                src={item.photo}
                                                className="img-fluid"
                                                alt={item.nom}
                                                style={{ maxHeight: '100%', objectFit: 'contain' }}
                                            />
                                        </div>
                                        <div className="card-body p-4 text-center">
                                            <span className="text-muted small text-uppercase fw-bold ls-1">{item.modele}</span>
                                            <h4 className="card-title fw-bold my-2">{item.nom}</h4>
                                            <div className="d-flex justify-content-center align-items-center mt-3">
                                                <span className="fs-4 fw-black" style={{ color: "#552583" }}>{item.price} €</span>
                                            </div>
                                        </div>
                                        <div className="card-footer bg-transparent border-0 pb-4 px-4 text-center">
                                            <button className="btn btn-outline-dark btn-sm rounded-pill w-100 fw-bold">
                                                VOIR LES DÉTAILS
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;