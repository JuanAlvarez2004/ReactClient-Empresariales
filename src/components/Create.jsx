import React, { useState } from 'react'
import axios from 'axios'
import MyCalendar from './Calendar.jsx' 
import 'react-calendar/dist/Calendar.css'
import "../styles/crud.css"

const NUMBER_INPUTS = ['daño', 'municion', 'vida', 'velocidad']
const API_URL = 'http://localhost:8080/Arma'

const Create = () => { 
    const [newRifle, setNewRifle] = useState({
        nombre: '',
        daño: '',
        municion: '',
        vida: '',
        velocidad: '',
        fechaCreacion: new Date().toISOString(),
      })

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(newRifle)
        axios.post(`${API_URL}/`, newRifle)
            .then(({ data }) => {
                console.log(data)
                alert("Rifle creado correctamente")
                setNewRifle({
                    nombre: '',
                    daño: '',
                    municion: '',
                    vida: '',
                    velocidad: '',
                    fechaCreacion: new Date().toISOString(),
                })
            }).catch((error) => {
                alert("Error al crear el rifle")
                console.error("Error al crear el rifle:", error)
            })
    }

    const handleInputChange = (e) => {
    const { name, value } = e.target

    let parsedValue = value.trim()
    if (NUMBER_INPUTS.includes(name)) {
        parsedValue = parseInt(parsedValue)
    }

    setNewRifle(prevRifle => ({
        ...prevRifle,
        [name]: parsedValue
    }))
    }

    // Función para manejar el cambio de fecha del calendario
    const handleDateChange = (formattedDate) => {
        setNewRifle(prevRifle => ({
            ...prevRifle,
            fechaCreacion: formattedDate
        }))
    }

    return (
    <div className='container'>
        <div className='container-content'>
        <h1>Formulario para rifle</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Nombre</label>
                <input name="nombre" value={newRifle.nombre} onChange={handleInputChange} type="text" />
                </div>
                <div>
                <label>Daño</label>
                <input name="daño" value={newRifle.daño === "" ? "" : newRifle.daño || ""} onChange={handleInputChange} type="number" min="0" step="1"/>
                </div>
                <div>
                <label>Munición</label>
                <input name="municion" value={newRifle.municion === "" ? "" : newRifle.municion || ""} onChange={handleInputChange} type="number" min="1" step="1" />
                </div>
                <div>
                <label>Vida</label>
                <input name="vida" value={newRifle.vida === "" ? "" : newRifle.vida || ""} onChange={handleInputChange} type="number" min="1" step="1" />
                </div>
                <div>
                <label>Velocidad</label>
                <input name="velocidad" value={newRifle.velocidad === "" ? "" : newRifle.velocidad || ""} onChange={handleInputChange} type="number" min="1" step="1" />
                </div>
                <div className='calendar-container'>
                <label>Fecha de creación</label>
                <br />
                <MyCalendar date={newRifle.fechaCreacion} onChange={handleDateChange} />
                </div>
                <button className='btnSubmit' type='submit'>Enviar</button>
            </form>
        </div>
    </div>
    )
}
export default Create
