import React, { useState } from 'react'
import axios from 'axios'
import "../styles/crud.css"

const API_URL = 'http://localhost:8080/Municion'

const ListRifle = () => { 
    const [municiones, setMuniciones] = useState([])

    const handleClick = () => {
        axios.get(`${API_URL}/`)
        .then(({ data }) => {
        console.log("data del get:", data)
        setMuniciones(data)
        })
        .catch((error) => {
            const { message, response } = error
            console.log(response.data)
            alert(response.data)
            console.error("Error al traer los datos", message)
        })
    }

    return (
    <div className='container'>
        <div className='container-content'>
        <h1>Municiones actuales</h1>
        <table>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Cadencia</th>
                <th>Daño en área</th> 
            </tr>
            </thead>
            <tbody>
            {
            (() => {
                if (municiones.length > 0) {
                    return (municiones.map((municion, index) => (
                        <tr key={index}>
                            <td>{municion.nombre}</td>
                            <td>{municion.cadencia}</td>
                            <td>{String(municion.dañoArea)}</td>
                        </tr>
                    )))
                }
                return (
                    <tr>
                    <td colSpan="3" style={{textAlign: "center"}}>No hay municiones en este momento</td>
                    </tr>
                )
            })()
            }
            </tbody>
        </table>
        <button className='btnSubmit' onClick={handleClick}>Listar</button>
        </div>
    </div>
    )
}
export default ListRifle
