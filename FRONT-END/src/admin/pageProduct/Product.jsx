import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import URL from "../../utils/constant/url";

const Product = () => {
    const [product, setProduct] = useState({
        id_marque: "",
        nom: "",
        category: "",
        attribute: {
            color: "",
            size: "",
            weight: "",
            pied:""
        },
        modele: "",
        photo: "",
        description: "",
        stock: "",
        prix: ""
    })

    const [allProduct, setAllProduct] = useState([])
    const [allMarque, setAllMarque] = useState([])

    useEffect(() => {
        getAllProduct(); getAllMarque()
    }, [])

    const getAllProduct = async () => {
        try {
            const { data, status } = await axios.get(URL.GET_ALL_PRODUIT)
            if (status === 200) setAllProduct(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const getAllMarque = async () => {
        try {
            const { data, status } = await axios.get(URL.GET_ALL_MARQUE)
            if(status === 200) setAllMarque(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteProduct = async (id) => {
        try {
            const { data, status } = await axios.delete(URL.DELETE_PRODUIT + '/' + id)
            if (status === 200) {
                console.log('produit supprimer');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { status } = await axios.post(URL.POST_PRODUIT)
            if(status === 201) console.log('produit ajouté');
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleChange = async (event) => {
        const { name, value } = event.target
        setProduct(prevProduct => ({...prevProduct, [name]:value}))
    }


    return (
        <>
            <table className="table table-stripped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Marque</th>
                        <th>Nom</th>
                        <th>Categorie</th>
                        <th>color</th>
                        <th>pied</th>
                        <th>modele</th>
                        <th>photo</th>
                        <th>description</th>
                        <th>stock</th>
                        <th>prix</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {allProduct.map((item) => (
                       <tr key={item._id}>
                        <td>{item.id_marque?.nom}</td>
                        <td>{item.nom}</td>
                        <td>{item.category}</td>
                        <td>{item.attribute?.color}</td>
                        <td>{item.attribute?.pied}</td>
                        <td>{item.modele}</td>
                        <td><img src={item.photo} alt={item.nom} width={100} /></td>
                        <td>{item.description}</td>
                        <td>{item.stock}</td>
                        <td>{item.prix}</td>
                        <td>        
                            <Link className="btn btn-info me-2" to={{pathname:`detail/${item._id}`}}>
                                <i className="bi bi-eye"></i>
                            </Link>
                            <Link className="btn btn-warning me-2" to={{pathname:`update/${item._id}`}}>
                                <i className="bi bi-pencil"></i>
                            </Link>
                            <button className="btn btn-danger" onClick={()=> deleteProduct(item._id)}>
                                <i className="bi bi-trash"></i>
                            </button>    
                        </td>
                    </tr> 
                    ))}
                    
                </tbody>
            </table>


            <h1>Update Produit</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nom" className="form-label">Nom</label>
                <input className="form-control" id='nom' type="text" name='nom' onChange={handleChange}/>

                <label htmlFor="category" className="form-label">Category</label>
                <select className="form-control" name="category" id="category" onChange={handleChange}>
                    <option value="">-- Choisir --</option>
                    <option value="shoes">Shoes</option>
                    <option value="backpack">Backpack</option>
                    <option value="ballon">Ballon</option>
                </select>

                <label htmlFor="color" className="form-label">Couleur</label>
                <input className="form-control" id='color' type="text" name='color' onChange={handleChange}/>

                <label htmlFor="size" className="form-label">Pointure</label>
                <input className="form-control" id='size' type="number" name='size' onChange={handleChange}/>

                <label htmlFor="weight" className="form-label">Poids</label>
                <input className="form-control" id='weight' type="number" name='weight' onChange={handleChange} />
                
                <label htmlFor="pied" className="form-label">Type de Pied</label>
                <select className="form-select" name="pied" id="pied" onChange={handleChange}>
                    <option value="">-- Choisir --</option>
                    <option value="plat">Plat</option>
                    <option value="creux">Creux</option>
                    <option value="neutre">Neutre</option>
                </select>

                <label htmlFor="modele" className="form-label">Modèle</label>
                <input className="form-control" id='modele' type="text" name='modele' onChange={handleChange} />

                <label htmlFor="photo" className="form-label">Photo</label>
                <input className="form-control" id='photo' type="text" name='photo' onChange={handleChange} />
                
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id='description' name='description' onChange={handleChange} />

                <label htmlFor="stock" className="form-label">Stock</label>
                <input className="form-control" id='stock' type="number" name='stock' onChange={handleChange} />

                <label htmlFor="prix" className="form-label">Prix</label>
                <input className="form-control" id='modele' type="number" name='modele' onChange={handleChange} />

                <label htmlFor="id_marque" className="form-label">Marque</label>
                <select className="form-select" id='id_marque' type="text" name='id_marque' onChange={handleChange} >
                    {allMarque.map(info => (
                        <option value={info._id}>{info.nom}</option>
                    ))}
                </select>

                <button>Envoyer</button>
            </form>
        </>
    )
}

export default Product