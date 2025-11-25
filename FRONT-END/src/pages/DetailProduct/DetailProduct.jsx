import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import URL from "../../utils/constant/url";

const DetailProduct = () => {

    const params = useParams();
    const { idProduct } = params;

    const [product, setProduct] = useState([])
    
    useEffect(() => {
        getProductById()
    }, [])

    const getProductById = async () => {
        try {
            const { data, status } = await axios.get(URL.GET_PRODUIT_BY_ID + '/' + idProduct)
            if(status === 200) setProduct(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <p>{product.nom}</p>
            <p>{product.category}</p>
            <p>{product.modele}</p>
            <img src={product.photo} alt={product.nom} width={200} />
            <p>{product.description}</p>
            <p>{product.prix}</p>
            <p>{product.stock}</p>
        </div>
    )
}

export default DetailProduct