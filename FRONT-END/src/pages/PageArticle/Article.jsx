import React from 'react'
import './Article.css';
import { createLayout } from 'animejs'
import { useEffect, useRef } from 'react'

export const Article = () => {

    // On utilise des Refs pour accéder aux éléments sans casser le cycle de React
    const containerRef = useRef(null);
    const dialogRef = useRef(null);
    const layoutRef = useRef(null);

    useEffect(() => {
        if (!dialogRef.current) return;

        layoutRef.current = createLayout(dialogRef.current, {
            children: ['.item', 'h2', 'h3', 'p'],
            properties: ['--overlay-alpha'],
        });

        // Nettoyage si nécessaire au démontage
        return () => {
            if (dialogRef.current) dialogRef.current.remove();
        };
    }, []);

    const openModal = (e) => {
        const $item = e.currentTarget; // Utilise currentTarget pour avoir le bouton
        const $dialog = dialogRef.current;

        // On clone l'élément pour l'animation
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
            // On retrouve l'élément caché pour le réafficher
            const $hiddenItem = containerRef.current.querySelector('.is-open');
            if ($hiddenItem) $hiddenItem.classList.remove('is-open');
        });
    };

    return (
        <div ref={containerRef} className="article-container">
            <dialog ref={dialogRef} id="layout-dialog" onClick={closeModal} />
            <div className='article-content'>
                <div className=''>
                    <h1>Comment choisir ses chaussures de sport en fonction de son type de pied ?</h1>
                    <p>Choisir les bonnes chaussures de sport en fonction de son type de pied est essentiel pour prévenir les blessures et améliorer les performances. Voici un guide pour vous aider à déterminer votre type de pied et à choisir les chaussures adaptées :</p>
                    <div>
                        <h1>Identifier son type de pied</h1>
                        <p>Il existe plusieurs types de pieds, chacun ayant des caractéristiques uniques. Voici les principaux types de pieds :</p>
                        <h2>Pied plat</h2>
                        <p>Le pied plat, également appelé pied pronateur, se caractérise par une voûte plantaire basse ou absente. Les personnes ayant des pieds plats ont tendance à avoir une démarche plus instable et peuvent être sujettes à des douleurs au niveau des pieds, des chevilles et des genoux.</p>
                        <h2>Pied creux</h2>
                        <p>Le pied creux, ou pied supinateur, se caractérise par une voûte plantaire très haute. Les personnes ayant des pieds creux ont tendance à avoir une démarche plus rigide et peuvent être sujettes à des douleurs au niveau des pieds, des chevilles et des genoux.</p>
                        <h2>Pied normal</h2>
                        <p>Le pied normal, ou pied neutre, se caractérise par une voûte plantaire modérée. Les personnes ayant des pieds normaux ont une démarche équilibrée et sont moins susceptibles de souffrir de douleurs au niveau des pieds, des chevilles et des genoux.</p>
                        <h2>Pied égyptien</h2>
                        <p>Le pied égyptien se caractérise par un gros orteil plus long que les autres orteils. Ce type de pied est souvent considéré comme esthétique et est courant dans certaines populations.</p>
                        <h2>Pied grec</h2>
                        <p>Le pied grec se caractérise par un deuxième orteil plus long que le gros orteil. Ce type de pied est également considéré comme esthétique et est courant dans certaines populations.</p>
                        <h2>Pied carré</h2>
                        <p>Le pied carré se caractérise par des orteils de longueur similaire, donnant au pied une apparence plus carrée. Ce type de pied est moins courant que les autres types.</p>
                    </div>
                </div>

                <div className='determination-section'>
                    <h2>Déterminer son type de pied</h2>
                    <p>Pour déterminer votre type de pied, vous pouvez faire le test de la mouillée. Humidifiez votre pied et posez-le sur une surface sèche, comme du papier ou du carton. Observez l'empreinte laissée par votre pied :</p>
                    <ul>
                        <li>Si l'empreinte montre presque toute la plante du pied, vous avez probablement des pieds plats.</li>
                        <li>Si l'empreinte montre une grande partie de la plante du pied, mais pas toute, vous avez probablement des pieds normaux.</li>
                        <li>Si l'empreinte montre une petite partie de la plante du pied, vous avez probablement des pieds creux.</li>
                    </ul>
                    <p>L'usure de vos chaussures peut également donner des indices sur votre type de pied. Observez l'usure de la semelle de vos chaussures :</p>
                    <ul>
                        <li>Une usure prononcée à l'intérieur de la semelle indique une pronation, souvent associée aux pieds plats.</li>
                        <li>Une usure uniforme indique un pied neutre.</li>
                        <li>Une usure prononcée à l'extérieur de la semelle indique une supination, souvent associée aux pieds creux.</li>
                    </ul>
                    <div className="large layout centered row">
                        <div className="layout-container col grid-layout row">
                            <button
                                onClick={openModal}
                                data-layout-id="A"
                                data-duration="1000"
                                className="button item col"
                            >
                                <h2 data-layout-id="A-title">Pied Plat/Pronateur</h2>
                                <p>
                                    Recherchez des chaussures avec bon maintien latéral et support de la voûte plantaire.
                                    <br />
                                    Privilégiez une semelle intermédiaire ferme pour limiter l'affaissement du pied.
                                    <br />
                                    Le maintien de la cheville (montantes) peut aider à stabiliser
                                </p>
                            </button>
                            <button
                                onClick={openModal}
                                data-layout-id="B"
                                data-duration="1000"
                                className="button item col"
                            >
                                <h2 data-layout-id="B-title">Pied Normal/Neutre</h2>

                                <p>
                                    Vous avez plus de flexibilité dans le choix
                                    <br />
                                    Basez-vous sur votre style de jeu et vos préférences de confort
                                </p>
                            </button>
                            <button
                                onClick={openModal}
                                data-layout-id="C"
                                data-duration="1000"
                                className="button item col"
                            >
                                <h2 data-layout-id="C-title">Pied Creux/Supinateur</h2>

                                <p>
                                    Choisissez des chaussures avec bon amorti pour absorber les chocs
                                    <br />
                                    Une semelle intermédiaire souple et coussinée (type Zoom Air, Bounce, etc.)
                                    <br />
                                    Évitez les modèles trop rigides qui accentueraient la supination
                                </p>
                            </button>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}



export default Article