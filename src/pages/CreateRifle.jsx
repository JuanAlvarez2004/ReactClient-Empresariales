import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MyCalendar from '../components/Calendar.jsx' 
import 'react-calendar/dist/Calendar.css'
import "../styles/crud.css"

const NUMBER_INPUTS = ['daño', 'municion', 'vida', 'velocidad']
const API_URL = 'http://localhost:8080/Arma'
const API_URL_MUNICION = 'http://localhost:8080/Municion'

const CreateRifle = () => { 
    const [newRifle, setNewRifle] = useState({
        nombre: '',
        daño: '',
        municion: '',
        vida: '',
        velocidad: '',
        fechaCreacion: new Date().toISOString(),
        tipoMunicion: null,
    })

    const [municiones, setMuniciones] = useState(null)

    const handleClickListMuniciones = (e) => {
        e.preventDefault()
        axios.get(`${API_URL_MUNICION}/`)
        .then(({ data }) => {
            console.log("data del get:", data)
            setMuniciones(data)
        })
        .catch((error) => {
            const { message, response } = error
            console.log(response.data)
            console.error("Error al traer los datos", message)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (newRifle.tipoMunicion === null) {
            alert("Por favor, seleccione un tipo de munición")
            return
        }
        
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
                    tipoMunicion: null,
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

        if (name === 'tipoMunicion') {
            parsedValue = JSON.parse(value)
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
                <input name="nombre" value={newRifle.nombre} onChange={handleInputChange} type="text" required/>
                </div>
                <div>
                <label>Daño</label>
                <input name="daño" value={newRifle.daño === "" ? "" : newRifle.daño || ""} onChange={handleInputChange} type="number" min="0" step="1" required/>
                </div>
                <div>
                <label>Munición</label>
                <input name="municion" value={newRifle.municion === "" ? "" : newRifle.municion || ""} onChange={handleInputChange} type="number" min="1" step="1" required/>
                </div>
                <div>
                <label>Vida</label>
                <input name="vida" value={newRifle.vida === "" ? "" : newRifle.vida || ""} onChange={handleInputChange} type="number" min="1" step="1" required/>
                </div>
                <div>
                <label>Velocidad</label>
                <input name="velocidad" value={newRifle.velocidad === "" ? "" : newRifle.velocidad || ""} onChange={handleInputChange} type="number" min="1" step="1" required/>
                </div>
                <div>
                <label>Tipo de munición</label>
                <button className='btnSubmit' onClick={handleClickListMuniciones}>Listar municiones</button>
                {(() => {
                    if (municiones && municiones.length > 0) {
                        return (
                            <table style={{marginTop: "10px"}}>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Cadencia</th>
                                        <th>Daño en Área</th>
                                        <th>Seleccionar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {municiones.map((m) => (
                                        <tr key={m.id}>
                                        <td>{m.nombre}</td>
                                        <td>{m.cadencia}</td>
                                        <td>{m.dañoArea.toString()}</td>
                                        <td>
                                            <input
                                            style={{accentColor: "green", cursor: "pointer", padding: '0px', margin: '0px'}}
                                            type="radio"
                                            name="tipoMunicion"
                                            value={JSON.stringify(m)}
                                            onChange={handleInputChange}
                                            />
                                        </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    } else {
                        return (
                        <div>
                            <p>Por favor, haga clic en el botón "Listar municiones" para cargar las municiones disponibles.</p>
                            <p>O crea una munición en el siguiente <Link style={{ color: 'green' }} to="/createMunicion">ENLACE</Link></p>
                        </div>
                        );
                    }
                })()}

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
export default CreateRifle
