import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MyCalendar from './CalendarComponent' 
import 'react-calendar/dist/Calendar.css'
import "./App.css"


const numberInputs = ['daño', 'municion', 'vida', 'velocidad']

function App() {
  const [newRifle, setNewRifle] = useState({
    nombre: '',
    daño: '',
    municion: '',
    vida: '',
    velocidad: '',
    fechaCreacion: new Date().toISOString(),
  })
  const [rifles, setRifles] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/Arma/')
      .then(({ data }) => {
        console.log("data del get:")
        console.log(data)
        setRifles(data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(newRifle)
    axios.post('http://localhost:8080/Arma/', newRifle)
      .then(({ data }) => {
        console.log(data)
        setRifles([...rifles, data])
        setNewRifle({
          nombre: '',
          daño: '',
          municion: '',
          vida: '',
          velocidad: '',
          fechaCreacion: new Date().toISOString(),
        })
      })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    let parsedValue = value.trim()
    if (numberInputs.includes(name)) {
      parsedValue = parseInt(value)
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
        <h1>Form</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <input name="nombre" value={newRifle.nombre} onChange={handleInputChange} type="text" />
          </div>
          <div>
            <label>Daño</label>
            <input name="daño" value={newRifle.daño} onChange={handleInputChange} type="number" min="1" step="1"/>
          </div>
          <div>
            <label>Munición</label>
            <input name="municion" value={newRifle.municion} onChange={handleInputChange} type="number" min="1" step="1" />
          </div>
          <div>
            <label>Vida</label>
            <input name="vida" value={newRifle.vida} onChange={handleInputChange} type="number" min="1" step="1" />
          </div>
          <div>
            <label>Velocidad</label>
            <input name="velocidad" value={newRifle.velocidad} onChange={handleInputChange} type="number" min="1" step="1" />
          </div>
          <div className='calendar-container'>
            <label>Fecha de creación</label>
            <br />
            <MyCalendar date={newRifle.fechaCreacion} onChange={handleDateChange} />
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
            {rifles.map((rifle, index) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App