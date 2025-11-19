import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import URL from '../../utils/constant/url'


const Home = () => {

    const [marque, setMarque] = useState([])

    useEffect(() => {
        getAllMarque()
    }, [])

    const getAllMarque = async () => {
        try {
            const { data, status } = await axios.get(URL.GET_ALL_MARQUE)
            if (status === 200) {
                setMarque(data)
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <>
            <h1>Test</h1>

            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam exercitationem minima dolore reiciendis debitis! Tenetur maxime numquam dicta perspiciatis tempora sunt dolorem saepe cumque. Quasi non similique possimus ipsum harum?</p>

            {marque.map(item => (
                <div key={item._id}>
                    <p>{item.nom}</p>
                    <img src={item.logo} alt="logo" />
                    <p>{item.description}</p>
                </div>
            ))}
        
        </>
    )
}

export default Home;