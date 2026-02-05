import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import URL from '../../utils/constant/url'
import axiosInstance from '../../utils/axios/axiosInstance.js'
import { animate, createScope, splitText, stagger } from 'animejs';
import { useRef } from 'react'

const Home = () => {

    const [allProduct, setAllProduct] = useState([])
    // const [loading, setLoading] = useState(true) sert à afficher un loader pendant le chargement des données
    const [loading, setLoading] = useState(true);

    const root = useRef(null);
    const scope = useRef(null);
    const [rotations, setRotations] = useState(0);

    useEffect(() => {
        getAllProduct()
    }, [])

    useEffect(() => {
        console.log('test');
        scope.current = createScope({ root }).add(self => {
            const { words } = splitText('h1', {
                words: { wrap: 'clip' },
            })

            const anime = animate(words, {
                y: [
                    { to: ['100%', '0%'] },
                    { to: '-100%', delay: 900, ease: 'in(3)' }
                ],
                duration: 950,
                ease: 'out(3)',
                delay: stagger(100),
                loop: true,
            })
        })
        return () => scope.current.revert()
    }, [])


    const getAllProduct = async () => {
        try {
            setLoading(true)
            const [{ data, status }] = await Promise.all([
                axiosInstance.get(URL.GET_ALL_PRODUIT),
                new Promise((resolve) => setTimeout(resolve, 500)) // Simule un délai de 500ms])
            ])
            if (status === 200) {
                setAllProduct(data)
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
            // setLoading (false) sert à cacher le loader une fois les données chargées
        }

        if (loading) {
            return (
                <div className="text-center my-5">
                    {/* Spinner Bootstrap standard */}
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                    <p className="mt-3">Chargement des produits...</p>
                </div>
            )
        }

    }


    return (
        <div ref={root} className='container my-5'>

            <div className="large centered row">
                <h1 className="text-xl">BALL DON'T LIE</h1>
            </div>
            <div className="small row"></div>

            <p className="lead text-muted text-center mb-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam exercitationem minima dolore reiciendis debitis! Tenetur maxime numquam dicta perspiciatis tempora sunt dolorem saepe cumque. Quasi non similique possimus ipsum harum?</p>

            {/* Vérification si la liste est vide après le chargement */}
            {allProduct.length === 0 && (
                <div className="alert alert-warning text-center" role="alert">
                    Aucun produit n'a été trouvé.
                </div>
            )}

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {allProduct.map(item => (
                    <div key={item._id} className="col card h-100 text-center p-3">
                        <div className="card h-100 shadow-sm"> {/* h-100 garantit que toutes les cartes ont la même hauteur */}
                            <img
                                src={item.photo}
                                className="card-img-top"
                                alt={item.nom}
                                style={{ height: '300px', objectFit: 'cover' }}
                            // Style inline pour une meilleure gestion de l'image et objectFit: 'cover' pour éviter la déformation
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title mb-1">{item.nom}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{item.modele}</h6>
                                <p className="card-text fw-bold mt-auto">{item.price} €</p>
                                {/* mt-auto pousse le prix vers le bas */}
                            </div>
                            <div className="card-footer bg-white border-0">
                                <Link to={`detail/${item._id}`} className="btn btn-primary w-100">
                                    Voir le produit
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}


            </div>
        </div>

    )
}

export default Home;