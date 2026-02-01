import React from "react";
import { useEffect, useState } from "react";
import URL from "../../utils/constant/url";
import { Navigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios/axiosInstance.js";
import { PRODUCT_FIELDS } from "../../utils/config/FormFiedls.js";

const UpdateProduct = () => {

    const params = useParams();
    const { idProduct } = params;

   const [product, setProduct] = useState({
    id_marque: "",
    nom: "",
    category: "",
    attributes: {
        color: "",
        size: [],
        weight: "",
        pied: ""
    },
    modele: "",
    photo: "",
    description: "",
    stock: "",
    price: ""
    });

    const [allMarque, setAllMarque] = useState([])

    useEffect(() => {
        getProductById(), getAllMarque()
    }, [])

    const getProductById = async () => {
        try {
            const { data, status } = await axiosInstance.get(URL.GET_PRODUIT_BY_ID + '/' + idProduct)
            if (status === 200) setProduct({
                ...data,
                attributes: {
                    color: data.attributes?.color || "",
                    size: data.attributes?.size || [],
                    weight: data.attributes?.weight || "",
                    pied: data.attributes?.pied || ""
                }
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    const getAllMarque = async () => {
        try {
            const { data, status } = await axiosInstance.get(URL.GET_ALL_MARQUE)
            if (status === 200) setAllMarque(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data, status} = await axiosInstance.put(URL.UPDATE_PRODUIT + '/' + idProduct, product)
            if (status === 200) {
                console.log("Produit mis à jour avec succès");
                setProduct(data)
                getProductById()
                alert("Produit mis à jour avec succès");
            } 
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        if (name === "color" || name === "weight" || name === "pied") {
            setProduct(prevProduct => ({
                ...prevProduct,
                attributes: {
                    ...prevProduct.attributes,
                    [name]: value
                }
            }))
        } else {
            setProduct(prevProduct => ({...prevProduct, [name]: value}))
        }
        
    }

    const handleSizeChange = (size) => {
        setProduct(prev => {
            const sizes = prev.attributes.size.includes(size)
            ? prev.attributes.size.filter(s => s !== size)
            : [...prev.attributes.size, size];

            return {
                ...prev,
                attributes: {
                    ...prev.attributes,
                    size: sizes
                }
            };
        });
    };


    return (
        <>
            <h1>Update Produit</h1>
            <form onSubmit={handleSubmit} className="container mt-4">
                <div className="row">
                    {PRODUCT_FIELDS.map((field, index) =>
                        <div key={index} className="mb-3 col-md-6">
                            <label className="form-label d-flex fw-bold" htmlFor={field.id}>{field.label}</label>
                            {field.type === "select" ? (
                                <select className="form-select" 
                                    name={field.name}
                                    id={field.id}
                                    value={product[field.name] || ""}
                                    onChange={handleChange}>
                                    <option value="">{field.placeholder}</option>
                                    <option value={field.option1}>{field.option1}</option>
                                    <option value={field.option2}>{field.option2}</option>
                                    <option value={field.option3}>{field.option3}</option>
                                </select>
                            ) :
                                field.type === "checkbox-group" ? (
                                <div className="d-flex flex-wrap gap-3">
                                    {[36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50].map(size => (
                                        <div key={size} className="form-check">
                                            <input 
                                                className="form-check-input"
                                                type="checkbox"
                                                id={`size-${size}`}
                                                value={size}
                                                checked={product.attributes?.size?.includes(size)}
                                                onChange={() => handleSizeChange(size)}
                                            />
                                            <label className="form-check-label" htmlFor={`size-${size}`}>
                                                {size}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <input className="form-control d-flex fw-bold" 
                                    type={field.type}
                                    name={field.name}
                                    id={field.id}
                                    placeholder={field.placeholder}
                                    value={
                                        field.name === "colors" ? product.attributes?.color || "" :
                                        field.name === "weight" ? product.attributes?.weight || "" :
                                        field.name === "pied" ? product.attributes?.pied || "" :
                                        product[field.name] || ""
                                    }
                                    onChange={handleChange} />
                            )}
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </>
    )
}

export default UpdateProduct