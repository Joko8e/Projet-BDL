import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import URL from "../../utils/constant/url";

const DetailMarque = () => {

    const params = useParams();
    const { idMarque } = params;

    const [marque, setMarque] = useState([])

    useEffect(() => {
        getMarqueById()
    }, [])

    const getMarqueById = async () => {
        try {
            const { data, status } = await axios.get(URL.GET_MARQUE_BY_ID + '/' + idMarque)
            if(status === 200) setMarque(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <p>{marque.nom}</p>
            <p>{marque.desciption}</p>
            <img src={marque.logo} alt={marque.nom}/>
        </div>
    )
}

export default DetailMarque