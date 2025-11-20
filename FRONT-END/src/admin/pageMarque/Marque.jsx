import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import URL from "../../utils/constant/url";
import { MARQUE_FIELDS } from "../../utils/config/FormFiedls";


const Marque = () => {

    const [marque, setMarque] = useState({
        nom: "",
        logo: "",
        desciption: "",
    })

    const [allMarque, setAllMarque] = useState([])

    useEffect(() => {
        getAllMarque()
    }, [])

    const getAllMarque = async () => {
        try {
            const { data, status } = await axios.get(URL.GET_ALL_MARQUE)
            setAllMarque(data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteMarque = async (id) => {
        try {
            const { data, status } = await axios.delete(URL.DELETE_MARQUE + '/' + id)
            if(status === 200) console.log('marque supprimé');
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setMarque(prevMarque => ({...prevMarque, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { status } = await axios.post(URL.POST_MARQUE)
            if (status === 201) console.log('Marque créer!');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Logo</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allMarque.map((item, index) => (
                     <tr key={item._id}>
                        <td>{item.nom}</td>
                        <td>
                            <img src={item.logo} alt={item.nom} width={150} />        
                        </td>
                        <td>{item.desciption}</td>
                        <td>
                            <Link to={{pathname:`detail/${item._id}`}}>
                                <i></i>        
                            </Link>
                            <Link to={{pathname:`update/${item._id}`}}>
                                <i></i>
                            </Link>
                            <button onClick={() => deleteMarque(item._id)}>
                                <i></i>
                            </button>
                        </td>
                    </tr>   
                    ))}
                </tbody>
            </table>

            <form className= 'd-flex' onSubmit={handleSubmit}>
                {MARQUE_FIELDS.map(field => (
                <div key={field.id}>
                    <label htmlFor={field.id}>{field.label} : </label>
                    <input  
                    type={field.type}
                    name={field.name}
                    id={field.id}
                    placeholder={field.placeholder}
                    onChange={handleChange}
                    />
                </div>
                ))}
            <button>Envoyer</button>
            </form>
        </>
    )
}

export default Marque