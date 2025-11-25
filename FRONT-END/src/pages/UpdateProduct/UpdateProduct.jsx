import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import URL from "../../utils/constant/url";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {

    const params = useParams();
    const { idProduct } = params;

    const [product, setProduct] = useState([])
    const [allMarque, setAllMarque] = useState([])

    useEffect(() => {
        getProductById(), getAllMarque()
    }, [])

    const getProductById = async () => {
        try {
            const { data, status } = await axios.get(URL.GET_PRODUIT_BY_ID + '/' + idProduct)
            if (status === 200) setProduct(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const getAllMarque = async () => {
        try {
            const { data, status } = await axios.get(URL.GET_ALL_MARQUE)
            if (status === 200) setAllMarque(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data, status} = await axios.put(URL.UPDATE_PRODUIT + '/' + idProduct, product)
            if(status === 200) setAgence(data)
            console.log("Info modifié");
            
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleChange = (event) => {
        const{name, value} = event.target
        setProduct(prevProduct => ({...prevProduct, [name]: value}))
    }

    return (
        <>
            <h1>Update Produit</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nom" className="form-label">Nom</label>
                <input className="form-control" id='nom' type="text" name='nom' value={product.nom || ""} onChange={handleChange}/>

                <label htmlFor="category" className="form-label">Category</label>
                <input className="form-control" id='category' type="text" name='category' value={product.category || ""} onChange={handleChange}/>

                <label htmlFor="color" className="form-label">Couleur</label>
                <input className="form-control" id='color' type="text" name='color' value={product.attribute?.color || ""} onChange={handleChange}/>

                <label htmlFor="size" className="form-label">Pointure</label>
                <input className="form-control" id='size' type="number" name='size' value={product.attribute?.size || ""} onChange={handleChange}/>

                <label htmlFor="weight" className="form-label">Poids</label>
                <input className="form-control" id='weight' type="number" name='weight' value={product.attribute?.weight || ""} onChange={handleChange} />
                
                <label htmlFor="pied" className="form-label">Type de Pied</label>
                <select className="form-select" name="pied" id="pied" value={product.attribute?.pied || ""} onChange={handleChange}>
                    <option value="">-- Choisir --</option>
                    <option value="plat">Plat</option>
                    <option value="creux">Creux</option>
                    <option value="neutre">Neutre</option>
                </select>

                <label htmlFor="modele" className="form-label">Modèle</label>
                <input className="form-control" id='modele' type="text" name='modele' value={product.modele || ""} onChange={handleChange} />

                <label htmlFor="photo" className="form-label">Photo</label>
                <input className="form-control" id='photo' type="text" name='photo' value={product.photo || ""} onChange={handleChange} />
                
                <label htmlFor="descrtiption" className="form-label">Description</label>
                <input className="form-control" id='description' type="text" name='description' value={product.description || ""} onChange={handleChange} />

                <label htmlFor="stock" className="form-label">Stock</label>
                <input className="form-control" id='stock' type="number" name='stock' value={product.stock || ""} onChange={handleChange} />

                <label htmlFor="prix" className="form-label">Prix</label>
                <input className="form-control" id='modele' type="number" name='modele' value={product.prix || ""} onChange={handleChange} />

                <label htmlFor="id_marque" className="form-label">Marque</label>
                <select className="form-select" id='id_marque' type="text" name='id_marque' value={product.id_marque || ""} onChange={handleChange} >
                    {allMarque.map(info => (
                        <option value={info._id}>{info.nom}</option>
                    ))}
                </select>

                <button>Envoyer</button>
            </form>
        </>
    )
}

export default UpdateProduct