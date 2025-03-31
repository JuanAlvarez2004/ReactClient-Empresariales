import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "../styles/crud.css"

const Delete = () => { 
    const [delRifle, setDelRifle] = useState({
        nombre: '',
        tipo: 'Rifle',
    })

    const [rifles, setRifles] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/Arma/')
            .then(({ data }) => {
                console.log(data)
                setRifles(data)
            })
            .catch(error => {
                console.error("Error al traer los datos", error)
            })
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDelRifle(prevRifle => ({
            ...prevRifle,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(delRifle)
        axios.delete('http://localhost:8080/Arma/', { data: delRifle })
            .then(({ data, status }) => {
                console.log(data)
                console.log(status)
                if (status === 200) {
                    alert('Se elimino correctamente')
                } 
                setRifles(data)
                setDelRifle({
                    nombre: '',
                    tipo: 'Rifle',
                })
            })
            .catch(error => {
                console.error("Error al eliminar:", error)
            }
        )
    }

    return (
    <div className='container'>
        <div className='container-content'>
            <h1>Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input name="nombre" value={delRifle.nombre} onChange={handleInputChange} type="text" />
                </div>
                <button className='btnSubmit' type='submit'>Enviar</button>
            </form>
        </div>
        <div className='container-content'>
            <h1>Rifles</h1>
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
                    const filteredRifles = rifles.filter(r => r.nombre === delRifle.nombre);
                    
                    if (filteredRifles.length === 0) {
                    return (
                        <tr>
                        <td colSpan="8" style={{textAlign: "center"}}>No se encontraron rifles con ese nombre</td>
                        </tr>
                    )
                    }
                    
                    return filteredRifles.map((rifle, index) => (
                    <tr key={index}>
                        <td>{rifle.nombre}</td>
                        <td>{rifle.cadenciaDisparo}</td>
                        <td>{rifle.capMunicion}</td>
                        <td>{rifle.daño}</td>
                        <td>{rifle.fechaCreacion}</td>
                        <td>{rifle.municion}</td>
                        <td>{rifle.velocidad}</td>
                        <td>{rifle.vida}</td>
                    </tr>
                    ))
                })()
                }
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default Delete
