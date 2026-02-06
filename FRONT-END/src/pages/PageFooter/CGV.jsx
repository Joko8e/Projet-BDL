import React from "react";

const CGV = () => {
    const sections = [
        { id: "objet", title: "1. Objet", content: "Les présentes conditions générales de vente détaillent les droits et obligations de la société et de son client dans le cadre de la vente des marchandises suivantes..." },
        { id: "prix", title: "2. Prix", content: "Les prix des marchandises vendues sont ceux en vigueur au jour de la prise de commande. Ils sont libellés en euros et calculés hors taxes..." },
        { id: "paiement", title: "3. Modalités de paiement", content: "Le règlement des commandes s'effectue par carte bancaire ou via les plateformes sécurisées partenaires. Lors de l'enregistrement de la commande, l'acheteur devra verser le montant global..." },
        { id: "livraison", title: "4. Livraison", content: "La livraison est effectuée au lieu indiqué par l'acheteur sur le bon de commande. Le délai de livraison indiqué lors de l'enregistrement de la commande n'est donné qu'à titre indicatif..." },
        { id: "retractation", title: "5. Droit de rétractation", content: "Conformément aux dispositions de l'article L 221-18 du Code de la consommation, l'acheteur dispose d'un délai de quatorze jours pour exercer son droit de rétractation..." },
    ];

    return (
        <div className="container py-5">
            {/* Header de la page */}
            <div className="text-center mb-5">
                <h1 className="fw-bold display-4" style={{ color: "#552583" }}>CONDITIONS GÉNÉRALES DE VENTE</h1>
                <div className="mx-auto" style={{ width: "100px", height: "4px", backgroundColor: "#FDB927" }}></div>
                <p className="mt-3 text-muted text-uppercase fw-bold" style={{ letterSpacing: "2px" }}>Dernière mise à jour : Février 2026</p>
            </div>

            <div className="row">
                {/* Sommaire Sticky à gauche (Desktop uniquement) */}
                <div className="col-lg-3 d-none d-lg-block">
                    <div className="sticky-top" style={{ top: "120px", zIndex: 10 }}>
                        <h5 className="fw-bold mb-3" style={{ color: "#552583" }}>Sommaire</h5>
                        <ul className="list-unstyled">
                            {sections.map((section) => (
                                <li key={section.id} className="mb-2">
                                    <a href={`#${section.id}`} className="text-decoration-none text-muted small hover-gold">
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Contenu principal */}
                <div className="col-lg-9">
                    <div className="bg-white p-4 p-md-5 shadow-sm rounded-4 border-top border-4" style={{ borderColor: "#552583" }}>
                        <p className="lead mb-5 border-bottom pb-4">
                            Les présentes conditions s'appliquent à toutes les ventes conclues par le biais du site Internet officiel. Veuillez lire attentivement ces documents avant toute commande.
                        </p>

                        {sections.map((section) => (
                            <section id={section.id} key={section.id} className="mb-5">
                                <h3 className="fw-bold mb-3" style={{ color: "#552583" }}>{section.title}</h3>
                                <p className="text-muted lh-lg">
                                    {section.content} Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Fuga eligendi explicabo ex aliquam nesciunt, praesentium eveniet eaque omnis in veritatis debitis.
                                </p>
                            </section>
                        ))}

                        <div className="alert mt-5 p-4" style={{ backgroundColor: "#552583", color: "#FDB927", borderRadius: "15px" }}>
                            <h4 className="fw-bold">Besoin d'aide ?</h4>
                            <p className="mb-0 text-white opacity-75">
                                Si vous avez des questions concernant nos CGV, n'hésitez pas à nous contacter directement via notre page de support.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                    .hover-gold:hover { color: #FDB927 !important; transition: 0.3s; }
                    html { scroll-behavior: smooth; }
                `}
            </style>
        </div>
    );
};

export default CGV;