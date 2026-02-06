import React, { useEffect, useRef } from 'react';
import './Article.css';
import { createLayout } from 'animejs';

export const Article = () => {
    const containerRef = useRef(null);
    const dialogRef = useRef(null);
    const layoutRef = useRef(null);

    useEffect(() => {
        if (!dialogRef.current) return;
        layoutRef.current = createLayout(dialogRef.current, {
            children: ['.item', 'h2', 'h3', 'p'],
            properties: ['--overlay-alpha'],
        });

        return () => {
            if (dialogRef.current) dialogRef.current.remove();
        };
    }, []);

    const openModal = (e) => {
        const $item = e.currentTarget;
        const $dialog = dialogRef.current;

        const $clone = $item.cloneNode(true);
        $dialog.innerHTML = '';
        $dialog.appendChild($clone);

        layoutRef.current.update(() => {
            $dialog.showModal();
            $item.classList.add('is-open');
        }, {
            duration: parseInt($item.dataset.duration) || 500
        });
    };

    const closeModal = () => {
        const $dialog = dialogRef.current;
        layoutRef.current.update(() => {
            $dialog.close();
            const $hiddenItem = containerRef.current.querySelector('.is-open');
            if ($hiddenItem) $hiddenItem.classList.remove('is-open');
        });
    };

    return (
        <div ref={containerRef} className="container py-5">
            <dialog ref={dialogRef} id="layout-dialog" onClick={closeModal} />
            
            <div className='article-content'>
                <div className='text-center mb-5'>
                    <h1 className="display-4 fw-bold" style={{ color: "#552583" }}>GUIDE CHAUSSURES</h1>
                    <div className="mx-auto" style={{ width: "80px", height: "4px", backgroundColor: "#FDB927" }}></div>
                </div>

                <div className='row justify-content-center mb-5'>
                    <div className='col-lg-10 bg-light p-4 rounded shadow-sm border-start border-4' style={{borderColor: "#552583"}}>
                        <h2 className="h4">Identifier son type de pied</h2>
                        <p className="text-muted">Il existe plusieurs types de pieds, chacun ayant des caractéristiques uniques. Voici les principaux :</p>
                        
                        <div className="row g-3 text-center mt-2">
                            {['Pied plat', 'Pied creux', 'Pied normal', 'Pied égyptien', 'Pied grec', 'Pied carré'].map((type) => (
                                <div key={type} className="col-6 col-md-4 col-lg-2">
                                    <div className="p-2 border rounded bg-white small fw-bold">{type}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='determination-section mt-5'>
                    <h2 className="text-center mb-4" style={{ color: "#552583" }}>Déterminer son type de pied</h2>
                    <div className="row row-cols-1 row-cols-md-3 g-4 layout-container">
                        
                        {/* BOUTON A */}
                        <div className="col">
                            <button onClick={openModal} data-layout-id="A" data-duration="800" className="button item w-100 shadow-sm">
                                <h2 className="h5 mb-0" data-layout-id="A-title">Pied Plat / Pronateur</h2>
                                <p>
                                    Recherchez des chaussures avec bon maintien latéral et support de la voûte plantaire.
                                    <br /><br />
                                    Privilégiez une semelle intermédiaire ferme pour limiter l'affaissement du pied.
                                </p>
                            </button>
                        </div>

                        {/* BOUTON B */}
                        <div className="col">
                            <button onClick={openModal} data-layout-id="B" data-duration="800" className="button item w-100 shadow-sm">
                                <h2 className="h5 mb-0" data-layout-id="B-title">Pied Normal / Neutre</h2>
                                <p>
                                    Vous avez plus de flexibilité dans le choix. 
                                    <br /><br />
                                    Basez-vous sur votre style de jeu et vos préférences de confort.
                                </p>
                            </button>
                        </div>

                        {/* BOUTON C */}
                        <div className="col">
                            <button onClick={openModal} data-layout-id="C" data-duration="800" className="button item w-100 shadow-sm">
                                <h2 className="h5 mb-0" data-layout-id="C-title">Pied Creux / Supinateur</h2>
                                <p>
                                    Choisissez des chaussures avec bon amorti pour absorber les chocs.
                                    <br /><br />
                                    Une semelle intermédiaire souple et coussinée (type Zoom Air, Bounce).
                                </p>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Article;