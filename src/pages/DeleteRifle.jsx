import React, { useState } from 'react'
import axios from 'axios'
import "../styles/crud.css"

const API_URL = 'http://localhost:8080/Arma'

const DeleteRifle = () => { 
    const [delRifle, setDelRifle] = useState({
        nombre: '',
        tipo: 'Rifle',
    })

    const [rifle, setRifle] = useState({})

    const handleFindRifle = () => {
        axios.post(`${API_URL}/buscarNombre`, { nombre: delRifle.nombre })
            .then(({ data }) => {
                console.log("Data del find rifle", data)
                setRifle(data)
            })
            .catch((error) => {
                const { message, response, status } = error
                if (status === 404) {
                    setRifle({})  
                }  
                alert(response.data)
                console.log(response.data)
                console.error("Error al traer los datos", message)
            })
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDelRifle(prevRifle => ({
            ...prevRifle,
            [name]: value
        }))
    }

    const handleDelete = (e) => {
        e.preventDefault()
        if (Object.keys(rifle).length === 0) {
            alert("No hay ningún rifle a eliminar")
            return
        } 

        const data = { id: rifle.id, tipo: rifle.tipo = delRifle.tipo }
        if (confirm("¿Estás seguro de que quieres borrar esta arma?")) {
            axios.delete(`${API_URL}/`, { data: data })
            .then(({ status }) => {
                if (status === 202) {
                    alert('Se elimino correctamente')
                } 
                setDelRifle({
                    nombre: '',
                    tipo: 'Rifle',
                })
                setRifle({})
            })
            .catch(error => {
                console.error("Error al eliminar:", error)
            }
        )
        } else {
            console.log("Acción cancelada");
            return
        }
    }

    return (
    <div className='container'>
        <div className='container-content'>
            <h1>Buscar rifle</h1>
            <div>
                <label>Nombre</label>
                <input name="nombre" value={delRifle.nombre} onChange={handleInputChange} type="text" required/>
            </div>
            <button className='btnSubmit' type='submit' onClick={handleFindRifle}>Buscar</button>
        </div>
        <div className='container-content'>
            <h1>Rifle Encontrado</h1>
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Cap. Municion</th>
                    <th>Daño</th> 
                    <th>Fecha Creacion</th>
                    <th>Munición</th> 
                    <th>Velocidad</th>
                    <th>Vida</th>
                    <th>Distancia</th>
                    <th>Tipo munición</th>
                </tr>
                </thead>
                <tbody>
                {
                (() => {
                    if (Object.keys(rifle).length !== 0) {
                        return (
                            <tr key={rifle.id}>
                                <td>{rifle.nombre}</td>
                                <td>{rifle.capMunicion}</td>
                                <td>{rifle.daño}</td>
                                <td>{rifle.fechaCreacion}</td>
                                <td>{rifle.municion}</td>
                                <td>{rifle.velocidad}</td>
                                <td>{rifle.vida}</td>
                                <td>{rifle.distancia}</td>
                                <td>{
                                    (() => {
                                        if (rifle.tipoMunicion === null) {
                                            return <span style={{color: "red"}}>No hay munición (Arma Inútil)</span>
                                        }
                                        const {cadencia, dañoArea, nombre} = rifle.tipoMunicion
                                        return <>
                                            <li style={{listStyleType: 'circle'}}>Cadencia: {cadencia}</li>
                                            <li style={{listStyleType: 'circle'}}>Daño Area: {dañoArea ? "true" : "false"}</li>
                                            <li style={{listStyleType: 'circle'}}>Nombre: {nombre}</li>
                                        </>
                                    })()
                                }</td>
                            </tr>
                        )
                    } else {
                        return (
                            <tr>
                            <td colSpan="9" style={{textAlign: "center"}}>No hay rifles en este momento</td>
                            </tr>
                        )
                    }
                    
                    
                    
                })()
                }
                </tbody>
            </table>
            <form onSubmit={handleDelete}>
                <button className='btnSubmit' type='submit'>Eliminar</button>    
            </form>
        </div>
    </div>
    )
}

export default DeleteRifle
