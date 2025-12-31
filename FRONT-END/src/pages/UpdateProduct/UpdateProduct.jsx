import React from "react";
import { useEffect, useState } from "react";
import URL from "../../utils/constant/url";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios/axiosInstance.js";
import { PRODUCT_FIELDS } from "../../utils/config/FormFiedls.js";

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
            const { data, status } = await axiosInstance.get(URL.GET_PRODUIT_BY_ID + '/' + idProduct)
            if (status === 200) setProduct(data)
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
            } 
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        if (name === "color" || name === "size" || name === "weight" || name === "pied") {
            setProduct(prevProduct => ({
                ...prevProduct,
                attribute: {
                    ...prevProduct.attribute,
                    [name]: value
                }
            }))
        } else {
            setProduct(prevProduct => ({...prevProduct, [name]: value}))
        }
        
    }

    return (
        <>
            <h1>Update Produit</h1>
            <form onSubmit={handleSubmit} className="container mt-4">
                <div className="row">
                    {PRODUCT_FIELDS.map((field, index) =>
                        <div key={field.id} className="mb-3 col-md-6">
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
                            ) : (
                                <input className="form-control d-flex fw-bold" 
                                    type={field.type}
                                    name={field.name}
                                    id={field.id}
                                    placeholder={field.placeholder}
                                    value={
                                        field.name === "colors" ? product.attribute?.color || "" :
                                        field.name === "sizes" ? product.attribute?.size || "" :
                                        field.name === "weight" ? product.attribute?.weight || "" :
                                        field.name === "pied" ? product.attribute?.pied || "" :
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