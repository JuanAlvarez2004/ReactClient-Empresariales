import React, { useState } from 'react'
import axios from 'axios'
import MyCalendar from '../components/Calendar.jsx'
import "../styles/crud.css"

const NUMBER_INPUTS = ['dano', 'municion', 'vida', 'velocidad']
const API_URL = 'http://localhost:8080/Arma'

const UpdateRifle = () => {
    const [searchName, setSearchName] = useState('')
  
    const [rifleFound, setRifleFound] = useState(null)
    const [rifleToUpdate, setRifleToUpdate] = useState({})

    const handleFindRifle = () => {
        if (!searchName.trim()) return
        axios.post(`${API_URL}/buscarNombre`, { nombre: searchName })
        .then(({ data }) => {
            console.log("Data del find rifle", data)
            setRifleFound(data)
        }).catch((error) => {
            if (error.status === 404) {
                alert("Rifle no encontrado")
            }
            setRifleFound(null)
            console.error("Error al buscar rifle:", error.message)
        })
    }

    const handleSearchChange = (e) => {
        setSearchName(e.target.value)
        setRifleToUpdate({})
    }

    const handleSelectRifle = () => {
        if (!rifleFound) return
        
        axios.post(`${API_URL}/buscar`, { id: rifleFound.id, tipo: 'Rifle' })
        .then(({ data }) => {
            // const { index, ...restData } = data
            // setRifleToUpdate({
            //     ...restData,
            //     id: index,
            //     tipo: 'Rifle'
            // })
            setRifleToUpdate(data)
        })
        .catch((error) => {
            console.error("Error al obtener detalles:", error)
        })
    }

    const handleUpdateFormChange = (e) => {
        const { name, value } = e.target
        
        let parsedValue = value.trim()
        if (NUMBER_INPUTS.includes(name)) {
            parsedValue = value === '' ? '' : parseInt(value)
        }
        
        setRifleToUpdate(prev => ({
        ...prev,
        [name]: parsedValue
        }))
    }

    const handleDateChange = (formattedDate) => {
        setRifleToUpdate(prev => ({
        ...prev,
        fechaCreacion: formattedDate
        }))
    }

    const handleSubmitUpdate = (e) => {
        e.preventDefault()
        console.log(rifleToUpdate)
        if (confirm("¿Estás seguro de que quieres actualizar esta arma?")) {
            axios.put(`${API_URL}/`, rifleToUpdate)
                .then(({ data }) => {
                    console.log(data)
                    setRifleFound(data)
                    setSearchName('')
                    alert('Rifle actualizado correctamente')
                })
                .catch((error) => {
                    console.error("Error al actualizar:", error)
                })
        } else {
            console.log("Acción cancelada.")
            return
        }
    }

    return (
        <div id='update-container' className='container'>
        <div className='container-content'>
            <h2>Buscar Rifle</h2>
            <div className='search-form'>
                <label htmlFor="search-name">Nombre del Rifle:</label>
                <input id="search-name" name="searchName" value={searchName} onChange={handleSearchChange} type="text" required/>
                <button className='btnSubmit' onClick={handleFindRifle}>Buscar</button>
            </div>
            {
            (() => {
                if (rifleFound && Object.keys(rifleFound).length > 0) {
                    return (<div className='search-results'>
                        <h3>Rifle Encontrado</h3>
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
                            <tr>
                                <td>{rifleFound.nombre}</td>
                                <td>{rifleFound.capMunicion}</td>
                                <td>{rifleFound.daño}</td>
                                <td>{rifleFound.fechaCreacion}</td>
                                <td>{rifleFound.municion}</td>
                                <td>{rifleFound.velocidad}</td>
                                <td>{rifleFound.vida}</td>
                                <td>{rifleFound.distancia}</td>
                                <td>{
                                    (() => {
                                        if (rifleFound.tipoMunicion === null) {
                                            return <span style={{color: "red"}}>No hay munición (Arma Inútil)</span>
                                        }
                                        const {cadencia, dañoArea, nombre} = rifleFound.tipoMunicion
                                        return <>
                                            <li style={{listStyleType: 'circle'}}>Cadencia: {cadencia}</li>
                                            <li style={{listStyleType: 'circle'}}>Daño Area: {dañoArea ? "true" : "false"}</li>
                                            <li style={{listStyleType: 'circle'}}>Nombre: {nombre}</li>
                                        </>
                                    })()
                                }</td>
                                <td>
                                    <button className='btnSubmit' onClick={handleSelectRifle}>Editar</button>
                                </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>)
                } else {
                    <p>No hay rifles</p>
                }
            })()
            }
        </div>
        
        {rifleToUpdate && Object.keys(rifleToUpdate).length > 1 && (
            <div className='container-content'>
            <h2>Actualizar Rifle</h2>
            <form onSubmit={handleSubmitUpdate}>
                <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input 
                    id="nombre"
                    name="nombre" 
                    value={rifleToUpdate.nombre || ''} 
                    onChange={handleUpdateFormChange} 
                    type="text" 
                    required
                />
                </div>
                
                <div className="form-group">
                <label htmlFor="dano">daño:</label>
                <input 
                    id="dano"
                    name="dano" 
                    value={rifleToUpdate.dano === undefined ? '' : rifleToUpdate.dano} 
                    onChange={handleUpdateFormChange} 
                    type="number" 
                    min="0" 
                    step="1"
                    required
                />
                </div>
                
                <div className="form-group">
                <label htmlFor="municion">Munición:</label>
                <input 
                    id="municion"
                    name="municion" 
                    value={rifleToUpdate.municion === undefined ? '' : rifleToUpdate.municion} 
                    onChange={handleUpdateFormChange} 
                    type="number" 
                    min="1" 
                    step="1"
                    required
                />
                </div>
                
                <div className="form-group">
                <label htmlFor="vida">Vida:</label>
                <input 
                    id="vida"
                    name="vida" 
                    value={rifleToUpdate.vida === undefined ? '' : rifleToUpdate.vida} 
                    onChange={handleUpdateFormChange} 
                    type="number" 
                    min="1" 
                    step="1"
                    required
                />
                </div>
                
                <div className="form-group">
                <label htmlFor="velocidad">Velocidad:</label>
                <input 
                    id="velocidad"
                    name="velocidad" 
                    value={rifleToUpdate.velocidad === undefined ? '' : rifleToUpdate.velocidad} 
                    onChange={handleUpdateFormChange} 
                    type="number" 
                    min="1" 
                    step="1"
                    required
                />
                </div>
                
                <div className='calendar-container'>
                <label>Fecha de creación:</label>
                <MyCalendar date={rifleToUpdate.fechaCreacion} onChange={handleDateChange}/>
                </div>
                <button className='btnSubmit' type='submit'>Actualizar</button>
            </form>
            </div>
        )}
        </div>
    )
}

export default UpdateRifle