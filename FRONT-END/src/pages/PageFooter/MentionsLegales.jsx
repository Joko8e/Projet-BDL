import React from "react";

const MentionsLegale = () => {
    const infos = [
        {
            title: "Éditeur du site",
            icon: "fa-user-tie",
            content: "Le site BDL est édité par Jordy M., entrepreneur individuel, dont le siège social est situé à Los Angeles (ou ton adresse), immatriculé sous le numéro SIREN [Ton Numéro]."
        },
        {
            title: "Hébergement",
            icon: "fa-server",
            content: "Ce site est hébergé par la société [Nom de l'hébergeur], située au [Adresse de l'hébergeur], joignable au [Téléphone]."
        },
        {
            title: "Propriété Intellectuelle",
            icon: "fa-copyright",
            content: "L'ensemble des contenus (textes, images, logos) est la propriété exclusive de BDL. Toute reproduction, même partielle, est strictement interdite sans autorisation préalable."
        },
        {
            title: "Données Personnelles",
            icon: "fa-shield-alt",
            content: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Contactez-nous par email pour toute demande."
        }
    ];

    return (
        <div className="container py-5">
            {/* Titre avec animation de soulignement */}
            <div className="text-center mb-5">
                <h1 className="fw-bold display-4" style={{ color: "#552583" }}>MENTIONS LÉGALES</h1>
                <div className="mx-auto" style={{ width: "80px", height: "4px", backgroundColor: "#FDB927" }}></div>
            </div>

            <div className="row g-4">
                {infos.map((info, index) => (
                    <div className="col-md-6" key={index}>
                        <div className="card h-100 border-0 shadow-sm p-4 transition-hover" 
                             style={{ borderRadius: "20px", borderLeft: "6px solid #552583" }}>
                            <div className="d-flex align-items-center mb-3">
                                <div className="rounded-circle d-flex align-items-center justify-content-center me-3" 
                                     style={{ width: "50px", height: "50px", backgroundColor: "#FDB927" }}>
                                    <i className={`fas ${info.icon} text-white`}></i>
                                </div>
                                <h4 className="mb-0 fw-bold" style={{ color: "#552583" }}>{info.title}</h4>
                            </div>
                            <p className="text-muted mb-0 lh-base">
                                {info.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Note de bas de page */}
            <div className="mt-5 p-4 rounded-4 text-center border" style={{ borderStyle: "dashed !important", borderColor: "#552583" }}>
                <p className="mb-0 text-muted small italic">
                    Pour toute information complémentaire, veuillez nous contacter à l'adresse 
                    <strong style={{ color: "#552583" }}> jordymavuidi@gmail.com</strong>.
                </p>
            </div>

            <style>
                {`
                    .transition-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
                    .transition-hover:hover { 
                        transform: translateY(-5px); 
                        box-shadow: 0 10px 20px rgba(85, 37, 131, 0.1) !important;
                    }
                `}
            </style>
        </div>
    );
};

export default MentionsLegale;