import React, { useState } from 'react'
import axios from 'axios'
import "../styles/crud.css"

const API_URL = 'http://localhost:8080/Municion'

const DeleteRifle = () => { 
    const [delMunicion, setDelMuncion] = useState({
        nombre: '',
    })

    const [municion, setMunicion] = useState({})

    const handleFindMunicion = () => {
        axios.post(`${API_URL}/buscarNombre/`, { nombre: delMunicion.nombre })
            .then(({ data }) => {
                console.log(data)
                setMunicion(data)
            })
            .catch((error) => {
                const { message, response, status } = error
                if (status === 404) {
                    setMunicion({})  
                }  
                alert(response.data)
                console.log(response.data)
                console.error("Error al traer los datos", message)
            })
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDelMuncion(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDelete = (e) => {
        e.preventDefault()
        if (Object.keys(municion).length === 0) {
            alert("No hay ningúna munición a eliminar")
            return
        } 

        const data = { id: municion.id }
        if (confirm("¿Estás seguro de que quieres borrar esta munición? \nLos rifles asociados a esta munición no podrán usarla y cambiarán a la predeterminada.")) {
            axios.delete(`${API_URL}/`, { data: data })
            .then(({ status }) => {
                if (status === 202) {
                    alert('Se elimino correctamente')
                } 
                setDelMuncion({
                    nombre: '',
                })
                setMunicion({})
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
            <h1>Buscar Munición</h1>
            <div>
                <label>Nombre</label>
                <input name="nombre" value={delMunicion.nombre} onChange={handleInputChange} type="text" required/>
            </div>
            <button className='btnSubmit' type='submit' onClick={handleFindMunicion}>Buscar</button>
        </div>
        <div className='container-content'>
            <h1>Munición Encontrado</h1>
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
                    if (Object.keys(municion).length !== 0) {
                        return (
                            <tr key={municion.id}>
                                <td>{municion.nombre}</td>
                                <td>{municion.cadencia}</td>
                                <td>{String(municion.danoArea)}</td>
                            </tr>
                        )
                    } else {
                        return (
                            <tr>
                            <td colSpan="3" style={{textAlign: "center"}}>No hay municiones en este momento</td>
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
