import React, { useState } from 'react'
import axios from 'axios'
import 'react-calendar/dist/Calendar.css'
import "../styles/crud.css"

const API_URL = 'http://localhost:8080/Arma'

const List = () => { 
    const [rifles, setRifles] = useState([])

    const handleClick = () => {
        axios.get(`${API_URL}/`)
        .then(({ data }) => {
        console.log("data del get:")
        console.log(data)
        setRifles(data)
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
        <h1>Rifles actuales</h1>
        <table>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Cadencia disparo</th>
                <th>Cap. Municion</th>
                <th>Daño</th>
                <th>Fecha Creacion</th>
                <th>Munición</th>
                <th>Velocidad</th>
                <th>Vida</th>
            </tr>
            </thead>
            <tbody>
            {
            (() => {
                if (rifles.length > 0) {
                    return (rifles.map((rifle, index) => (
                        <tr key={index}>
                        <td>{rifle.nombre}</td>
                        <td>{rifle.cadenciaDisparo}</td>
                        <td>{rifle.capMunicion}</td>
                        <td>{rifle.daño}</td>
                        <td>{(() => {
                                let year = rifle.fechaCreacion[0]
                                let month = rifle.fechaCreacion[1]
                                let day = rifle.fechaCreacion[2]
                                return `${year}-${month}-${day}`
                            })()}
                        </td>
                        <td>{rifle.municion}</td>
                        <td>{rifle.velocidad}</td>
                        <td>{rifle.vida}</td>
                        </tr>
                    )))
                }
                return (
                    <tr>
                    <td colSpan="8" style={{textAlign: "center"}}>No hay rifles en este momento</td>
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
export default List
