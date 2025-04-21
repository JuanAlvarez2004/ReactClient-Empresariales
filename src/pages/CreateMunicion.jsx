import React, { useState } from 'react'
import axios from 'axios'
import "../styles/crud.css"

const NUMBER_INPUTS = ['cadencia']
const API_URL = 'http://localhost:8080/Municion'

const CreateMunicion = () => { 
    const [newMunicion, setNewMunicion] = useState({
        nombre: '',
        cadencia: '',
        danoArea: false,
      })

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(newMunicion)
        axios.post(`${API_URL}/`, newMunicion)
            .then(({ data }) => {
                console.log(data)
                alert("Munición creada correctamente")
                setNewMunicion({
                    nombre: '',
                    cadencia: '',
                    danoArea: false,
                })
            }).catch((error) => {
                alert("Error al crear la munición")
                console.error("Error al crear la munición:", error)
            })
    }

    const handleInputChange = (e) => {
        const { name, value, checked } = e.target

        let parsedValue = value.trim()
        if (NUMBER_INPUTS.includes(name)) {
            parsedValue = parseInt(parsedValue)
        }

        if (name === 'danoArea') {
            parsedValue = checked
        }

        setNewMunicion(prev => ({
            ...prev,
            [name]: parsedValue
        }))
    }

    return (
    <div className='container'>
        <div className='container-content'>
        <h1>Formulario para munición</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Nombre</label>
                <input name="nombre" value={newMunicion.nombre} onChange={handleInputChange} type="text" required/>
                </div>
                <div>
                <label>Cadencia</label>
                <input name="cadencia" value={newMunicion.cadencia === "" ? "" : newMunicion.cadencia || ""} onChange={handleInputChange} type="number" min="0" step="1" required/>
                </div>
                <div>
                <label>Daño en área</label>
                <input style={{
                    accentColor: "green",       
                    width: "20px",            
                    height: "20px",
                    cursor: "pointer",        
                    margin: "5px",
                    verticalAlign: "middle"
                }}  name='danoArea' checked={newMunicion.danoArea} onChange={handleInputChange} type="checkbox" />
                </div>
                <button className='btnSubmit' type='submit'>Enviar</button>
            </form>
        </div>
    </div>
    )
}
export default CreateMunicion
