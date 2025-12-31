import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import URL from "../../utils/constant/url";
import axiosInstance from "../../utils/axios/axiosInstance";
import { PRODUCT_FIELDS } from "../../utils/config/FormFiedls";

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
    //state pour stocker l'id de la marque à supprimer
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        getAllProduct(); getAllMarque()
    }, [])

    const getAllProduct = async () => {
        try {
            const { data, status } = await axiosInstance.get(URL.GET_ALL_PRODUIT)
            if (status === 200) setAllProduct(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const getAllMarque = async () => {
        try {
            const { data, status } = await axiosInstance.get(URL.GET_ALL_MARQUE)
            if(status === 200) setAllMarque(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    //fonction pour ouvrir le modal de confirmation de suppression
    const confirmDelete = (_id) => {
            setProductToDelete(_id);
    
            // Ouvrir le modal
            const modal = new Modal(
                document.getElementById("deleteModal")
            );
            modal.show();
        };

    const deleteProduct = async (_id) => {
        console.log(_id);
        
        if(!productToDelete) return;
        try {
            const { status } = await axiosInstance.delete(URL.DELETE_PRODUIT + '/' + _id)
            if (status === 200) {
                console.log('produit supprimer');
                getAllProduct()
            }
        } catch (error) {
            console.log(error.message);
        }

        // Fermer le modal après la suppression
        const modalElement = document.getElementById("deleteModal");
        const modal = Modal.getInstance(modalElement);
        modal.hide();
        setProductToDelete(null);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { status } = await axiosInstance.post(URL.POST_PRODUIT, product)
            if (status === 201) {
                console.log('produit ajouté');
                getAllProduct()
                setProduct({
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
            }
            
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleChange = async (event) => {
        const { name, value } = event.target

        if (name === "color" || name === "size" || name === "weight" || name === "pied") {
            setProduct(prevProduct => ({
                ...prevProduct,
                attribute: {
                    ...prevProduct.attribute,
                    [name]: value
                }
            }))
        }
        else {
                setProduct(prevProduct => ({ ...prevProduct, [name]: value }))
        }
    }


    return (
        <>
            <div className="table-responsive" style={{ maxHeight: "500px", overflowY: "auto" }}>
                <table className="table table-striped table-bordered">
                <thead className="table-dark sticky-top text-center align-middle">
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
                            <button className="btn btn-danger" onClick={()=> confirmDelete(item._id)}>
                                <i className="bi bi-trash"></i>
                            </button>    
                        </td>
                    </tr> 
                    ))}
                    
                </tbody>
                </table>
            </div>


            <h1>Ajouter un Produit</h1>
            <form onSubmit={handleSubmit} className="container mt-4">
                <div className="row">
                    {PRODUCT_FIELDS.map((field, index) => (
                        <div className="mb-3 col-md-6" key={index}>
                            <label htmlFor={field.id} className="form-label">{field.label}</label>
                            {field.type === "select" ? (
                                <select
                                    className="form-select"
                                    id={field.id}
                                    name={field.name}
                                    value={product[field.name]}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">{field.placeholder}</option>
                                    <option value={field.option1}>{field.option1}</option>
                                    <option value={field.option2}>{field.option2}</option>
                                    <option value={field.option3}>{field.option3}</option>
                                </select>
                            ) : (
                                <input
                                    type={field.type}
                                    className="form-control"
                                    id={field.id}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={
                                        field.name in product.attribute ? product.attribute[field.name] : product[field.name]
                                    }
                                    onChange={handleChange}
                                    required
                                />
                            )}
                        </div>
                    ))}

                    <div className="mb-3 col-md-6">
                        <label htmlFor="id_marque" className="form-label">Marque</label>
                        <select
                            className="form-select"
                            id="id_marque"
                            name="id_marque"
                            value={product.id_marque}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Sélectionner une marque</option>
                            {allMarque.map((marque) => (
                                <option key={marque._id} value={marque._id}>{marque.nom}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3 col-md-12">
                        <button type="submit" className="btn btn-primary">Ajouter le produit</button>
                    </div>
                </div>
            </form>

            {/* Modal de confirmation de suppression */}
            <div className="modal fade" id="deleteModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Confirmer la suppression</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            Êtes-vous sûr de vouloir supprimer cette marque ?
                            <br />
                            <strong>Cette action est irréversible.</strong>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Annuler
                            </button>

                            <button type="button" className="btn btn-danger" onClick={() => deleteProduct(productToDelete)}>
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product