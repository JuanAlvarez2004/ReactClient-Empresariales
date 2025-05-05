import React, { useState } from 'react'
import axios from 'axios'
import "../styles/crud.css"

const NUMBER_INPUTS = ['cadencia']
const API_URL = 'http://localhost:8080/Municion'

const UpdateMunicion = () => {
    const [searchName, setSearchName] = useState('')
  
    const [municionFound, setMunicionFound] = useState(null)
    const [municionToUpdate, setMunicionToUpdate] = useState({})

    const handleFindMunicion = () => {
        if (!searchName.trim()) return
        
        axios.post(`${API_URL}/buscarNombre/`, { nombre: searchName })
        .then(({ data }) => {
            setMunicionFound(data)
        }).catch((error) => {
            if (error.status === 404) {
                alert("Munición no encontrada")
            }
            setMunicionFound(null)
            console.error("Error al buscar munición:", error.message)
        })
    }

    const handleSearchChange = (e) => {
        setSearchName(e.target.value)
        setMunicionToUpdate({})
    }

    const handleSelectMunicion = () => {
        if (!municionFound) return
        
        axios.post(`${API_URL}/buscar/`, { id: municionFound.id })
        .then(({ data }) => {
            // const { index, ...restData } = data
            // setMunicionToUpdate({
            //     ...restData,
            //     indice: index,
            // })
            setMunicionToUpdate(data)
        })
        .catch((error) => {
            console.error("Error al obtener detalles:", error)
        })
    }

    const handleUpdateFormChange = (e) => {
        const { name, value, checked } = e.target
        
        let parsedValue = value.trim()
        if (NUMBER_INPUTS.includes(name)) {
            parsedValue = value === '' ? '' : parseInt(value)
        }

        if (name === 'danoArea') {
            parsedValue = checked
        }
        
        setMunicionToUpdate(prev => ({
            ...prev,
            [name]: parsedValue
        }))
    }

    const handleSubmitUpdate = (e) => {
        e.preventDefault()
        console.log(municionToUpdate)
        if (confirm("¿Estás seguro de que quieres actualizar esta munición?")) {
            axios.put(`${API_URL}/`, municionToUpdate)
                .then(({ data }) => {
                    console.log(data)
                    setMunicionFound(data)
                    setSearchName('')
                    alert('Munición actualizado correctamente')
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
            <h2>Buscar Munición</h2>
            <div className='search-form'>
                <label htmlFor="search-name">Nombre de la Munición:</label>
                <input id="search-name" name="searchName" value={searchName} onChange={handleSearchChange} type="text" required/>
                <button className='btnSubmit' onClick={handleFindMunicion}>Buscar</button>
            </div>
            {
            (() => {
                if (municionFound && Object.keys(municionFound).length > 0) {
                    return (<div className='search-results'>
                        <h3>Munición Encontrada</h3>
                        <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Cadencia</th>
                                <th>Daño en área</th> 
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{municionFound.nombre}</td>
                                <td>{municionFound.cadencia}</td>
                                <td>{String(municionFound.danoArea)}</td>
                                <td>
                                    <button className='btnSubmit' onClick={handleSelectMunicion}>Editar</button>
                                </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>)
                } else {
                    <p>No hay Municiones</p>
                }
            })()
            }
        </div>
        
        {municionToUpdate && Object.keys(municionToUpdate).length > 1 && (
            <div className='container-content'>
            <h2>Actualizar Munición</h2>
            <form onSubmit={handleSubmitUpdate}>
                <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input 
                    id="nombre"
                    name="nombre" 
                    value={municionToUpdate.nombre || ''} 
                    onChange={handleUpdateFormChange} 
                    type="text" 
                    required
                />
                </div>
                
                <div className="form-group">
                <label htmlFor="cadencia">Cadencia:</label>
                <input 
                    id="cadencia"
                    name="cadencia" 
                    value={municionToUpdate.cadencia === undefined ? '' : municionToUpdate.cadencia} 
                    onChange={handleUpdateFormChange} 
                    type="number" 
                    min="0" 
                    step="1"
                    required
                />
                </div>
                
                <div className="form-group">
                <label htmlFor="danoArea">Daño en área:</label>
                <input style={{
                    accentColor: "green",       
                    width: "20px",            
                    height: "20px",
                    cursor: "pointer",        
                    margin: "5px",
                    verticalAlign: "middle"
                }}  name='danoArea' checked={municionToUpdate.danoArea} onChange={handleUpdateFormChange} type="checkbox"/>
                </div>
                <button className='btnSubmit' type='submit'>Actualizar</button>
            </form>
            </div>
        )}
        </div>
    )
}

export default UpdateMunicion