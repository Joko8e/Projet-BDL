import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import URL from "../../utils/constant/url";

const Product = () => {
    const [product, setProduct] = useState({
        id_marque: "",
        nom:"",
    })

    const [allProduct, setAllProduct] = useState([])
    const [allMarque, setAllMarque] = useState([])

    useEffect(() => {
        getAllProduct(); getAllMarque()
    }, [])


    return (
        <>
        </>
    )
}

export default Product