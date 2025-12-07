import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios/axiosInstance.js";
import URL from "../../utils/constant/url.js";

const DetailCommande = () => {

    const params = useParams();
    const { idCommande } = params;

    const [commande, setCommande] = useState([])

    useEffect(() => {
        getCommandeById()
    }, [])

    const getCommandeById = async () => {
        try {
            const { data, status } = await axiosInstance.get(URL.GET_COMMANDE_BY_ID + '/' + idCommande)
            if(status === 200) setCommande(data)
        } catch (error) {
            console.log(error.message);
        }
    }
    
    return (
        <div>
            <p>Client: {commande.client}</p>
            <p>Date de Commande: {commande.dateCommande}</p>
            <p>Total: {commande.total} €</p>
            <p>Status: {commande.status}</p>
        </div>
    )
}

export default DetailCommande;